module.exports = {
  siteMetadata: {
    siteUrl: `https://friendly-weather.netlify.app/`,
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
