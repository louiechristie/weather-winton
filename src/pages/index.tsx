import getForecast, { getMockForecast } from '@/utilities/getForecast';
import { getPageProps } from '@/utilities/display/getPageProps';
import Page, { PageProps } from '@/components/Page';

type legacyPagesConfig = {
  maxDuration?: number;
  runtime?: 'edge' | 'experimental-edge' | 'nodejs' | string; // necessary unless config is exported as const
  regions?: string[];
  unstable_runtimeJS: false;
};

export const config: legacyPagesConfig = {
  unstable_runtimeJS: false,
};

export default function Home(props: PageProps) {
  const { items, meta, errorMessage } = props;

  return <Page items={items} meta={meta} errorMessage={errorMessage} />;
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    return await getPageProps(getForecast);
  }
  return await getPageProps(getMockForecast);
}
