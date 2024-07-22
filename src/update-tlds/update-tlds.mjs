import { writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// this file is run directly without transformation by make, so need to specify the extension
import { Email } from '../email.mjs'

const validTLDs = await Email.updateLatestTLDs(true)

const __dirname = /* for node 20.11/20.2+ */ import.meta.dirname /* for node 10.12+ */ ||
  dirname(fileURLToPath(import.meta.url))

const validTLDsPath = resolve(__dirname, '..', 'lib', 'valid-tlds.mjs')

await writeFile(
  validTLDsPath,
  'const validTLDs = ' + JSON.stringify(validTLDs, null, '  ') + '\n\nexport { validTLDs }\n',
  { encoding : 'utf8' })

// self-test results
const { validTLDs : tlds } = await import(validTLDsPath)
if (!tlds || tlds.COM !== true) {
  throw new Error('Something went wrong with the TLD import (failed self-check).')
}