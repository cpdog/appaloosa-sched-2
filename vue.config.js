module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/" : "/",
  pwa: {
    workboxOptions: {
      exclude: [
        "web.config",
        "robots.txt",
        /\.map$/,
        /^manifest.*\.js(?:on)?$/,
        /\/icons/
      ]
    },
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "img/icons/icon-152x152.png",
      maskIcon: "img/icons/icon-144x144.png",
      msTileImage: "img/icons/icon-144x144.png"
    }
  }
};
