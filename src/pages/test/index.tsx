import { getMockForecast } from '@/utilities/getForecast';
import { getPageProps } from '@/utilities/display/getPageProps';
import Page, { PageProps } from '@/components/Page';

export default function Home(props: PageProps) {
  const { items, meta, errorMessage } = props;

  return <Page items={items} meta={meta} errorMessage={errorMessage} />;
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    return await getPageProps(getMockForecast);
  }
  return await getPageProps(getMockForecast);
}
