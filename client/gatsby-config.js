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
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        headers: {
          '/favicon.ico': [
            'cache-control: public, max-age=0, must-revalidate,',
          ],
          '/apple-touch-icon.png': [
            'cache-control: public, max-age=0, must-revalidate,',
          ],
          '/og-image-*.png': [
            'cache-control: public, max-age: 31536000, immutable,',
          ],
        },
      },
    },
  ],
};
