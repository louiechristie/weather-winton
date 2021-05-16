require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
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
    `gatsby-plugin-postcss`,
    `gatsby-plugin-gatsby-cloud`,
  ],
};
