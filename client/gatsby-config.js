module.exports = {
  siteMetadata: {
    siteUrl: `https://weather.louiechristie.com/`,
    monetization: `$ilp.gatehub.net/484331722`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-no-javascript`,
  ],
};
