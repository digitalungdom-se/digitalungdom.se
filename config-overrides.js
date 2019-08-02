const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');
const pack = require('./package.json')
const { override, fixBabelImports } = require('customize-cra');

const state = process.env.NODE_ENV === "production" ? "prod" : "dev"

/* config-overrides.js */
module.exports = override(
	fixBabelImports('import', {
	  libraryName: 'antd',
	  libraryDirectory: 'es',
	  style: 'css',
	}),
	rewireAliases.aliasesOptions({
      '@components': path.resolve(__dirname, `${paths.appSrc}/${state}_components/`),
      '@wrappers': path.resolve(__dirname, `${paths.appSrc}/${state}_wrappers/`)
  })
)
