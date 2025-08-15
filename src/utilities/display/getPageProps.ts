import { ErrorMessage, PageProps } from '@/components/Page';
import getSpecialDates from '@/utilities/getSpecialDates';
import type SpecialDate from '@/types/specialDate';

import meta from '@/utilities/meta/meta';

import type { Items } from '@/utilities/transformMetOfficeJSON';
import getErrorItems, { ErrorItems } from '@/error/getErrorItems';

export async function getPageProps(
  getItems: (specialDates: SpecialDate[]) => Promise<Items>
) {
  let items: Items | ErrorItems;
  let errorMessage: ErrorMessage = null;

  try {
    const specialDates: SpecialDate[] = await getSpecialDates();

    items = await getItems(specialDates);

    if (!items || items.length < 1) {
      throw new Error(`No items in retrieved weather forecast`);
    }
  } catch (error) {
    console.error('Error creating pages');
    console.error(error);

    if (error instanceof Error) {
      errorMessage = error.toString();
    }
    errorMessage = String(error);
    items = getErrorItems(errorMessage);
  }

  const pageProps: PageProps = {
    items,
    meta: {
      ...meta,
      todaysWeather: items[0].description,
      image: items[0].icon,
    },
    errorMessage,
  };

  return {
    props: pageProps,
  };
}
