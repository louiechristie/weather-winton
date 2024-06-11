// eslint-disable-next-line node/no-extraneous-import
import dotenv from 'dotenv';
dotenv.config();

export default {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-twitter`,
  ],
};
