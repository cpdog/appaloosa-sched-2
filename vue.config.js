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
    }
  }
};
