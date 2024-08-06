# string-input
[![coverage: 100%](./.readme-assets/coverage.svg)](https://github.com/liquid-labs/string-input/pulls?q=is%3Apr+is%3Aclosed)

A library to validate user input strings; compatible with command-line-args.

This package is currently a prototype.

## Install

```bash
npm i string-input
```

## Usage

General usage:

```javascript
import { readFileSync } from 'node:fs'
import { Day, Email } from 'string-input'

const csv = readFileSync(process.env.FILE_PATH, { encoding: 'utf8' })
const lines = csv.split('\n') // of course in reality we'd use a library here

for (const line of lines) {
  const [ name, email, birthday ] = line.split(/\s*,\s*/)
  // validate contents
  Email(email)
  const bdayBoundary = new Date()
  bdayBoundary = bdayBoundary.setYear(bdayBoundary.getFullYear() - 125)
  Day(birthday, { after: bdayBoundary }) // no one's older than 125
}
```

With [command-line-args](https://github.com/75lb/command-line-args#readme) (or similar), you can make set the type options directly on the option specification:
```javascript
import commandLineArgs from 'command-line-args'
import { Day, Email, ValidatedString }

const bdayBoundary = new Date()
bdayBoundary = bdayBoundary.setYear(bdayBoundary.getFullYear() - 125)

const optionSpec = [
  { name: 'name', defaultOption: true, type: ValidatedString, maxLength: 40 },
  { name: 'birthday', type: Date, after: bdayBoundary },
  { name: 'email', type: Email }
]

const options = commandLineArgs(optionSpec)
```

## Custom validation functions

All the type functions take `validateInput` and `validateValue` functions.

These functions each take two arguments: either the original input or the processed value, respectively, and an options object containing `input` and `selfDescription` fields, plus all the original options passed into the type function or set on the context, if any. E.g.:
```javascript
const options = { 
  name: 'email', 
  noPlusEmails: true, 
  propertyForValidationFunction: 'BAIL OUT!',
  validateInput: (input, { name, selfDescription, propertyForValidationFunction }) => {
    if (propertyForValidationFunction === 'BAIL OUT!') {
      return `${selfDescription} input '${name}' is bailing out!`
    }
  }
}
// 'validateInput' will see all the original options, plus 'input' and 'selfDescription`
Email('foo@bar.com', options)
// or
// options.type = Email
// options.type('foo@bar.com')
```

The validate functions _must_ return `true` if validated. Any non-`true` result is treated as indicative of failure. If the validation function returns a string, than that is treated as an explanation of the issue and it is embedded in a string like: `${type} ${name} input '${input} ${result}.` E.g., if our validation function returns 'contains offensive words', then the error message raised would be something like, "Email personalEmail input 'asshat@foo.com' contains offensive words."
