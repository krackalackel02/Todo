const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");

module.exports = {
	entry: {
		bundle: ["./src/index.js", "./src/styles.css"], // Use a single entry point that includes both JS and SCSS
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js", // Output a single bundle file
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src/index.html"),
			filename: "index.html",
		}),
		new HtmlWebpackInlineSVGPlugin({
			runPreEmit: true,
		}),
	],
	module: {
		rules: [
			{
				test: /\.(css|scss)$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
		],
	},
};
