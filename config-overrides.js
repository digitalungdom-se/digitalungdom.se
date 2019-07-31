const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');
const pack = require('./package.json')
const { override, fixBabelImports } = require('customize-cra');

/* config-overrides.js */
module.exports = override(
	fixBabelImports('import', {
	  libraryName: 'antd',
	  libraryDirectory: 'es',
	  style: 'css',
	}),
	rewireAliases.aliasesOptions({
      '@components': path.resolve(__dirname, `${paths.appSrc}/prod_components/`),
      '@wrappers': path.resolve(__dirname, `${paths.appSrc}/prod_wrappers/`)
  })
)
