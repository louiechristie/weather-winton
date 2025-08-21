import { ErrorMessage, PageProps } from '@/components/Page';
import getSpecialDates from '@/utilities/getSpecialDates';
import type SpecialDate from '@/types/specialDate';

import meta from '@/utilities/meta/meta';

import type { Item, Items } from '@/utilities/transformMetOfficeJSON';
import getErrorItems, { ErrorItems } from '@/error/getErrorItems';
import { getImageDirectoryFromWeatherItem } from '@/utilities/file/getImageDirectory';

export async function getPageProps(
  getItems: (specialDates: SpecialDate[]) => Promise<Items>
) {
  let items: Items | ErrorItems;
  let errorMessage: ErrorMessage = null;
  let todayWeatherItem;

  try {
    const specialDates: SpecialDate[] = await getSpecialDates();

    items = await getItems(specialDates);

    todayWeatherItem = <Item>(<unknown>items[0]);

    if (!items || items.length < 1 || todayWeatherItem === undefined) {
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

  const imageDirectory = todayWeatherItem
    ? getImageDirectoryFromWeatherItem(todayWeatherItem)
    : meta.ogImageDirectory;

  const pageProps: PageProps = {
    items,
    meta: {
      ...meta,
      todaysWeather: todayWeatherItem
        ? todayWeatherItem.description
        : meta.todaysWeather,
      image: todayWeatherItem ? todayWeatherItem.icon : meta.image,
      ogImageDirectory: imageDirectory,
    },
    errorMessage,
  };

  return {
    props: pageProps,
  };
}
