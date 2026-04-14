import Link from 'next/link';

export const styles = {
  adLinked: {
    position: 'relative',
  },
  ad: {
    maxWidth: 320,
    position: 'absolute' /* Sit on top of the page content */,
    width: '100%' /* Full width (cover the whole page) */,
    height: '100%' /* Full height (cover the whole page) */,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2 /* Specify a stack order in case you're using a different order for other elements */,
    cursor: 'pointer' /* Add a pointer on hover */,
  },
  adText: {
    textAlign: 'center',
  },
} as const;

const Advert = () => {
  return (
    <div suppressHydrationWarning>
      <h3 style={styles.adText}>Advert</h3>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          Enjoy Beer, au naturel this weekend 🥵☀️
          <br />
          <br />
          New Stella Artois Unfiltered, available in stores and online across
          the UK.{' '}
          <a href="https://twitter.com/hashtag/BeerAuNaturel?src=hash&amp;ref_src=twsrc%5Etfw">
            #BeerAuNaturel
          </a>{' '}
          <a href="https://twitter.com/hashtag/WeatherAuNaturel?src=hash&amp;ref_src=twsrc%5Etfw">
            #WeatherAuNaturel
          </a>
        </p>
        &mdash; StellaArtoisUK (@StellaArtoisUK){' '}
        <a href="https://twitter.com/StellaArtoisUK/status/1547990626641137666?ref_src=twsrc%5Etfw">
          July 15, 2022
        </a>
      </blockquote>{' '}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
      <p style={styles.adText}>
        Why this Ad?: Because it&apos;s a heatwave, let&apos;s show a picture of{' '}
        <Link href="https://undergroundcomedian.wordpress.com/gonzo/">
          Nigel Thomas
        </Link>{' '}
        with his shirt off. (Sunglasses recommended 😎)
      </p>
      <h3 style={styles.adText}>End of Advert</h3>
    </div>
  );
};

export default Advert;
