module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					app: './src/app',
					entities: './src/entities',
					features: './src/features',
					shared: './src/shared',
					widgets: './src/widgets',
				},
			},
		],
	],
}
