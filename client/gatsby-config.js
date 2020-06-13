module.exports = {
  siteMetadata: {
    siteUrl: `https://weather.louiechristie.com/`,
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
    'gatsby-plugin-no-javascript',
  ],
};
