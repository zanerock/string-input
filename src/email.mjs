import { emailRE } from 'regex-repo'

// have to specify extensions because this gets imported directly (untransformed) form update-tlds.mjs
import { checkValidateInput } from './lib/check-validate-input.mjs'
import { checkValidateValue } from './lib/check-validate-value.mjs'
import { describeInput } from './lib/describe-input.mjs'
import { typeChecks } from './lib/type-checks.mjs'
import { validTLDs } from './lib/valid-tlds.mjs'

let fetchWarning = null

const Email = function (
  input,
  {
    name = this?.name,
    noPlusEmails = this?.noPlusEmails,
    restrictToKnownTLDs = this?.restrictToKnownTLDs,
    validateInput = this?.validateInput,
    validateValue = this?.validateValue
  } = {}
) {
  const selfDescription = describeInput('Email', name)
  typeChecks(input)

  const emailMatch = input.match(emailRE)
  if (emailMatch === null) {
    throw new Error(`${selfDescription} input '${input}' does not appear to be a valid email address.`)
  }

  const [username, domain] = input.split('@')
  if (noPlusEmails === true) {
    if (username.includes('+')) {
      throw new Error(`${selfDescription} input '${input}' includes disallowed '+' username extension.`)
    }
  }
  if (restrictToKnownTLDs) {
    const domains = domain.split('.')
    const tld = domains[domains.length - 1].toUpperCase()

    const testTLDs = restrictToKnownTLDs === true ? validTLDs : restrictToKnownTLDs
    if (!(tld in testTLDs)) {
      let msg = `${selfDescription} input '${input}' includes unknown TLD '${tld}'.`
      if (restrictToKnownTLDs === true && fetchWarning !== null) {
        msg += ' ' + fetchWarning
      }
      throw new Error(msg)
    }
  }

  checkValidateInput(input, { selfDescription, validateInput })
  const value = username + '@' + domain.toLowerCase()
  checkValidateValue(value, { input, selfDescription, validateValue })

  return value
}

Email.updateLatestTLDs = async (dieOnError) => {
  const tldsListURL = 'https://data.iana.org/TLD/tlds-alpha-by-domain.txt'

  try {
    const response = await fetch(tldsListURL)
    if (response.ok === false) {
      throw new Error(`status: ${response.status}`)
    }
    const tldList = await response.text()
    for (const prop in validTLDs) {
      delete validTLDs[prop]
    }
    for (const tld of tldList.split('\n')) {
      if (tld.length > 0 && tld.startsWith('#') !== true) {
        validTLDs[tld.trim()] = true
      }
    }

    return validTLDs
  } catch (e) {
    if (dieOnError === true) {
      throw e
    } // else
    fetchWarning = `Was unable to fetch latest TLDs (${e.message}).`
  }
}

export { Email }
