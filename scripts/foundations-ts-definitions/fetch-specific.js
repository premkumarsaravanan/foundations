const args = process.argv.slice(2)
const apiVersion = args[0]
const fetchMarketplaceDefinition = require('./fetch-platform-definition')

if (!apiVersion) {
  throw new Error('parameter 0 (api-version) is required')
}
