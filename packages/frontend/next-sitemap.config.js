/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://stickers.avoonix.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "out",
  changefreq: "monthly",
  autoLastmod: false,
   transform: async (config, path) => {
    if(path.includes("headless") || path.includes("debug")) return null;
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
    }
  },
}
