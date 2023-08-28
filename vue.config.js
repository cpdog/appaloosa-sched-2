module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/" : "/",
  pwa: {
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: /.*/,
          handler: 'cacheFirst',
          options: {
            cacheName:'everythingcache',
            expiration: {
              maxAgeSeconds: 24 * 60 * 60, // 1 days
            },
          },
        },
      ],
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
