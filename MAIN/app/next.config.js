module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
};
