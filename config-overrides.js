const path = require('path');
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');

const resolve = dir => path.resolve(__dirname, dir);

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: 'css',
	}),
	addWebpackAlias({
		'@components': resolve('src/prod_components'),
		'@wrappers': resolve('src/prod_wrappers')
	}),
);
