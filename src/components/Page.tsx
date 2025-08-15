import Head from '@/components/Head';

import Footer from '@/components/Footer';
import Days from '@/components/Days';
import Info from '@/components/Info';
import ErrorBoxes from '@/components/ErrorBoxes';

import getAppBarStyle, { defaultAppBarStyle } from '@/styles/getAppBarStyle';
import Header from '@/components/Header';

import type Meta from '@/types/meta';
import type { Items } from '@/utilities/transformMetOfficeJSON';
import { isItem, isItems } from '@/utilities/transformMetOfficeJSON';
import { ErrorItems } from '@/error/getErrorItems';

export type ErrorMessage = string | null;

export interface PageProps {
  items: Items | ErrorItems;
  meta: Meta;
  errorMessage: ErrorMessage;
}

export default function Home(props: PageProps) {
  const { items, meta, errorMessage } = props;

  let temperatureClass = defaultAppBarStyle;

  if (isItem(items[0])) {
    temperatureClass = getAppBarStyle(items[0]);
  }

  return (
    <>
      <Head meta={meta} items={items} />

      <Header
        title={meta.siteTitle}
        description={meta.location}
        image={items && items[0] && items[0].icon}
        alt={meta.todaysWeather}
        temperatureClass={temperatureClass}
        meta={meta}
      />

      <main>
        {!errorMessage && isItems(items) && items?.length && (
          <Days items={items} />
        )}

        {errorMessage && (
          <ErrorBoxes meta={meta} items={items} errorMessage={errorMessage} />
        )}

        <Info meta={meta} />

        <Footer meta={meta} />
      </main>
    </>
  );
}
