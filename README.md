# string-input

A library to validate user input strings; compatible with command-line-args.

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

With [command-line-args](https://github.com/75lb/command-line-args#readme):
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