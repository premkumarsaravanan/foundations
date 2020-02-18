#!/usr/bin/env node
const path = require('path')
const { getPreviousTag, editReleaseNote, getVersionTag, runCommand, getRef } = require('./utils')

const releaseProd = async () => {
  runCommand('git', ['checkout', getRef()])
  const [, , ...args] = process.argv
  const packageName = args[0]
  const bucketName = args[1]
  const { version, packageName: packageNameOnTag } = getVersionTag()
  if (!packageName) {
    console.error('No package name was specified for your deployment')
    process.exit(1)
  }

  if (!bucketName) {
    console.error('No bucket name was specified for your deployment')
    process.exit(1)
  }

  if (packageName === packageNameOnTag) {
    const distPath = path.resolve(__dirname, '../../', 'packages', packageName, 'public', 'dist')
    runCommand('aws', [
      's3',
      'cp',
      distPath,
      `s3://${bucketName}`,
      '--grants',
      'read=uri=http://acs.amazonaws.com/groups/global/AllUsers',
      '--recursive',
    ])
    const previousTag = getPreviousTag({ packageName: packageNameOnTag })

    await editReleaseNote({ packageName: packageNameOnTag, version, previousTag })
  }
}

releaseProd()
