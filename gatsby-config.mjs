import dotenv from 'dotenv';
dotenv.config();

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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
    `gatsby-plugin-twitter`,
  ],
};
