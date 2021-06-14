module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    //fileloader test
    /*
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: "file-loader",
        },
      ],
    });
*/
    return config;
  },
};
