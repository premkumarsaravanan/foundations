const {npm_package_version, GITHUB_TOKEN, GITHUB_ACTOR, GITHUB_REPOSITORY} = process.env
const remoteRepo = `https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git`
const tagName=`v${npm_package_version}-beta`
const { execSync } = require('child_process');

// delete tag remotely and locally
execSync(`git remote add origin ${remoteRepo}`)
execSync(`git config --global user.email "${GITHUB_ACTOR}@email.com"`)
execSync(`git config --global user.name "${GITHUB_ACTOR}"`)

try {
execSync(`git commit -am 'Publish ${tagName} -- with dist files'`)
} catch (err) {
  console.log(err);
}

try {
  execSync(`git tag -d ${tagName}`)
  execSync(`git push --delete origin ${tagName}`)
} catch (_) {
  // Delete existed tag will resulted in Error
  // Ignored
}

// Tag current commit
execSync(`git tag ${tagName}`)

// Push the tag
execSync(`git push origin ${tagName}`)

