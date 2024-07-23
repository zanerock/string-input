import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { Email } from '../email'

// this gets compiled and run as a CJS file, so we have to use a immediately self-executing function
(async () => {
  const validTLDs = await Email.updateLatestTLDs(true)

  // this gets compiled and executed from '~/tool'
  const validTLDsPath = resolve('src', 'lib', 'valid-tlds.mjs')

  await writeFile(
    validTLDsPath,
    'const validTLDs = ' + JSON.stringify(validTLDs, null, '  ') + '\n\nexport { validTLDs }\n',
    { encoding : 'utf8' })

  // self-test results
  const { validTLDs : tlds } = await import(validTLDsPath)
  if (!tlds || tlds.COM !== true) {
    throw new Error('Something went wrong with the TLD import (failed self-check).')
  }
})()
