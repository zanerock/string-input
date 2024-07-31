// import { regex } from 'regex'
// import { validate } from 'email-validator'

import { checkValidateInput } from './lib/check-validate-input'
import { checkValidateValue } from './lib/check-validate-value'
import { describeInput } from './lib/describe-input'
import { typeChecks } from './lib/type-checks'
import { validTLDs } from './lib/valid-tlds'

let fetchWarning = null

// eslint-disable-next-line  no-control-regex, no-useless-escape
const emailRE = /^(((((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))*(?:(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))|((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)))?((([A-Za-z])|([0-9])|[\!\#\$\%\&'\*\+\/\=\?\^_\`\{\|\}\~\-])+(?:\.(([A-Za-z])|([0-9])|[\!\#\$\%\&'\*\+\/\=\?\^_\`\{\|\}\~\-])+)*)((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))*(?:(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))|((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)))?)|(((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))*(?:(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))|((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)))?(")(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?((([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21\x23-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(")((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))*(?:(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))|((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)))?))@((((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))*(?:(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))|((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)))?((([A-Za-z])|([0-9])|[\!\#\$\%\&'\*\+\/\=\?\^_\`\{\|\}\~\-])+(?:\.(([A-Za-z])|([0-9])|[\!\#\$\%\&'\*\+\/\=\?\^_\`\{\|\}\~\-])+)*)((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))*(?:(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))|((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)))?)|(((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))*(?:(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))|((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)))?\[(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?((([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x5a\x5e-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\]((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))*(?:(?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(\((?:((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?(?:(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f])|[\x21-\x27\x2a-\x5b\x5d-\x7e])|(\\([\x01-\x09\x0b\x0c\x0e-\x7f]))))*((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)?\)))|((?:([\x20\x09])*(\x0d\x0a))?([\x20\x09])+)))?)))$/v
/*
let emailRE
(async () => {
  const { regex } = await import('regex')

emailRE = regex`
^\g<addr_spec>$

(?(DEFINE)
   # (?<address>         \g<mailbox> | \g<group>)
   # (?<mailbox>         \g<name_addr> | \g<addr_spec>)
   # (?<name_addr>       \g<display_name>? \g<angle_addr>)
   # (?<angle_addr>      \g<CFWS>? < \g<addr_spec> > \g<CFWS>?)
   # (?<group>           \g<display_name> : (?:\g<mailbox_list> | \g<CFWS>)? ;
   #                                       \g<CFWS>?)
   # (?<display_name>    \g<phrase>)
   # (?<mailbox_list>    \g<mailbox> (?: , \g<mailbox>)*)

   (?<addr_spec>       \g<local_part> @ \g<domain>)
   (?<local_part>      \g<dot_atom> | \g<quoted_string>)
   (?<domain>          \g<dot_atom> | \g<domain_literal>)
   (?<domain_literal>  \g<CFWS>? \[ (?: \g<FWS>? \g<dcontent>)* \g<FWS>?
                                 \] \g<CFWS>?)
   (?<dcontent>        \g<dtext> | \g<quoted_pair>)
   (?<dtext>           \g<NO_WS_CTL> | [\x21-\x5a\x5e-\x7e])

   (?<atext>           \g<ALPHA> | \g<DIGIT> | [!#$%&'*+\/=?^_\`\{\|\}~\-])
   (?<atom>            \g<CFWS>? \g<atext>+ \g<CFWS>?)
   (?<dot_atom>        \g<CFWS>? \g<dot_atom_text> \g<CFWS>?)
   (?<dot_atom_text>   \g<atext>+ (?: \. \g<atext>+)*)

   (?<text>            [\x01-\x09\x0b\x0c\x0e-\x7f])
   (?<quoted_pair>     \\ \g<text>)

   (?<qtext>           \g<NO_WS_CTL> | [\x21\x23-\x5b\x5d-\x7e])
   (?<qcontent>        \g<qtext> | \g<quoted_pair>)
   (?<quoted_string>   \g<CFWS>? \g<DQUOTE> (?:\g<FWS>? \g<qcontent>)*
                        \g<FWS>? \g<DQUOTE> \g<CFWS>?)

   (?<word>            \g<atom> | \g<quoted_string>)
   (?<phrase>          \g<word>+)

   # Folding white space
   (?<FWS>             (?: \g<WSP>* \g<CRLF>)? \g<WSP>+)
   (?<ctext>           \g<NO_WS_CTL> | [\x21-\x27\x2a-\x5b\x5d-\x7e])
   (?<ccontent>        \g<ctext> | \g<quoted_pair> | \g<comment>)
   # (?<comment>         \( (?: \g<FWS>? \g<ccontent>)* \g<FWS>? \) )
   (?<comment>         \( (?: \g<FWS>? (?: \g<ctext> | \g<quoted_pair> ))* \g<FWS>? \) )
   (?<CFWS>            (?: \g<FWS>? \g<comment>)*
                       (?: (?:\g<FWS>? \g<comment>) | \g<FWS>))

   # No whitespace control
   (?<NO_WS_CTL>       [\x01-\x08\x0b\x0c\x0e-\x1f\x7f])

   (?<ALPHA>           [A-Za-z])
   (?<DIGIT>           [0-9])
   (?<CRLF>            \x0d \x0a)
   (?<DQUOTE>          ")
   (?<WSP>             [\x20\x09])
 )
`

console.log(emailRE.toString())

})()
*/
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

  const isValid = emailRE.test(input)
  if (isValid === false) {
    throw new Error(`${selfDescription} input '${input}' does not appear to be a valid email address.`)
  }

  // we want to extract the username and domain portions, but there can be multiple '@', if quoted
  const bits = input.split('@')
  const domain = bits.pop()
  const username = bits.join('@')
  if (noPlusEmails === true) {
    if (username.includes('+')) {
      throw new Error(`${selfDescription} input '${input}' includes disallowed '+' in username.`)
    }
  }
  if (restrictToKnownTLDs) {
    const domains = domain.split('.')
    const tld = domains[domains.length - 1]

    const testTLDs = restrictToKnownTLDs === true ? validTLDs : restrictToKnownTLDs
    if (!(tld.toUpperCase() in testTLDs)) {
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
