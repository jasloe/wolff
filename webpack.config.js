const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = () => {
  return {
    entry: {
      main: ["./src/scss/main.scss", "./src/js/main.js"]
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                config: {
                  path: __dirname + "/postcss.config.js"
                },
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass")
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { modules: false }]]
            }
          }
        }
      ]
    },
    output: {
      path: path.join(__dirname, "dev")
    },
    devtool: "source-map",
    plugins: [
      new MiniCssExtractPlugin(),
      new BrowserSyncPlugin({
        host: "localhost",
        port: 8080,
        proxy: "http://local.sound.local/",
        files: ["*.theme", "templates/**/*.twig"]
      })
    ]
  };
};
