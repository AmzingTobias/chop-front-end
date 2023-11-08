import AdBanner from "../components/advertisement-banners/AdBanner";
import ProductGridMini from "../components/product-cards/ProductGridMini";
import { getRandomProducts, mapProductsToImages } from "../data/products";
import summerAdBanner from "@/public/Ads/Summer promotion/summer-long.png";
import summerMobileAdBanner from "@/public/Ads/Summer promotion/summer-mobile.png";

export default async function Home() {
  const NUMBER_OF_PRODUCTS_FOR_HOME_PAGE = 25;
  // List of randomly selected products
  const randomProducts = await getRandomProducts(
    NUMBER_OF_PRODUCTS_FOR_HOME_PAGE
  );
  // Mapped to the structure that allows them to be displayed in a grid
  const productsToDisplay = await mapProductsToImages(randomProducts, 640, 853);

  return (
    <main className="flex flex-col w-full">
      <AdBanner
        className="hidden md:flex"
        image={{
          src: summerAdBanner.src,
          height: summerAdBanner.height,
          width: summerAdBanner.width,
          altText: "Text",
        }}
      />
      <AdBanner
        className="md:hidden"
        image={{
          src: summerMobileAdBanner.src,
          height: summerMobileAdBanner.height,
          width: summerMobileAdBanner.width,
          altText: "Text",
        }}
      />
      <br className="my-4" />
      <ProductGridMini gridColumnMinRem={16} products={productsToDisplay} />
    </main>
  );
}
