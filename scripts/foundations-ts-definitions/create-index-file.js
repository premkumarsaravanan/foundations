const fs = require('fs')
const path = require('path')
const { FOUNDATION_TYPES_FOLDER } = require('./constants')

const prettifyCode = require('./format-code')
const files = FOUNDATION_TYPES_FOLDER
const indexFilePath = path.resolve(FOUNDATION_TYPES_FOLDER, './types/index.ts')

fs.writeFileSync(
  indexFilePath,
  prettifyCode(
    '// @ts-ignore\n' +
      files
        .filter(file => file !== 'index.ts')
        .map(file => file.replace('.ts', ''))
        .map(file => `export * from './${file}'`)
        .join('\n// @ts-ignore\n'),
  ),
)
