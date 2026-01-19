import { Temporal } from 'temporal-polyfill';
import { theme, Paper, Typography } from '../utilities/theme';
import Meta from '@/types/meta';

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderTopStyle: 'solid',
    borderTopRadius: 20,
    backgroundColor: '#F8F8F8',
    marginBottom: '0',
  },
} as const;

const GitHubBadge = () => (
  <>
    <a href="https://github.com/louiechristie/weather-winton/">
      <img
        style={{ verticalAlign: 'middle' }}
        src="https://github.com/louiechristie/weather-winton/actions/workflows/tests.yml/badge.svg"
        width={139}
        height={20}
        alt="Github Integration Tests"
        loading="lazy"
      />
    </a>
  </>
);

const HostedOn = () => {
  return (
    <>
      <img
        style={{ verticalAlign: 'middle' }}
        src="/images/vercel-badge.svg"
        alt="Vercel logo"
        width={119}
        height={20}
        loading="lazy"
      />{' '}
      {process.env.NODE_ENV !== 'production' && <>(Local Development) </>}
      <GitHubBadge />
    </>
  );
};

const Footer = (props: { meta: Meta }) => {
  const { meta } = props;

  const systemTimeZone = Temporal.Now.timeZoneId();
  const year = Temporal.Instant.from(meta.timeStamp).toZonedDateTimeISO(
    systemTimeZone
  ).year;

  return (
    <Paper style={styles.footer}>
      <Typography variant="body2" component="p" align="center">
        Last updated: {meta.timeStamp} | Hosted on: {HostedOn()}
      </Typography>

      <Typography variant="body2" component="p" align="center">
        Tech: Next.js, React.js, TypeScript, HTML, CSS, etc
      </Typography>

      <Typography variant="body2" component="p" align="center">
        Weather Winton ©️ {year} v{meta.version} | Tags: user experience, UX
      </Typography>

      <Typography variant="body2" component="p" paragraph align="center">
        Data from: Met Office | Contains public sector information licensed
        under the{' '}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0
          {/* Source, footer of https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/open-government-licence/copyright-notices-attribution-statements/how-to-use-the-ogl-symbol/*/}
          <svg
            style={{
              color: 'black',
              verticalAlign: 'text-bottom',
              marginLeft: 8,
            }}
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 483.2 195.7"
            width="40"
            height="16"
          >
            <title>Open Government Licence</title>
            <path
              fill="currentColor"
              d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
            />
          </svg>
        </a>
      </Typography>

      <Typography
        variant="body2"
        component="p"
        color="inherit"
        paragraph
        align="center"
      >
        Made by: <a href={meta.author.url}> {meta.author.name}</a>
      </Typography>
    </Paper>
  );
};

export default Footer;
