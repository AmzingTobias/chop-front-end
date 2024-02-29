import SectionHeading from "@/app/components/SectionHeading";
import AdBanner from "@/app/components/advertisement-banners/AdBanner";
import ProductCarousel from "@/app/components/product-cards/ProductCarousel";
import { getRandomProducts, mapProductsToImages } from "@/app/data/products";
import summerAdBanner from "@/public/Ads/Summer promotion/summer-long.png";
import summerMobileAdBanner from "@/public/Ads/Summer promotion/summer-mobile.png";
import { EAccountTypes, getAccountTypeFromCookie } from "@/app/data/auth";
import { cookies } from "next/headers";
import ProductViewHistory from "@/app/components/products/ProductViewHistory";

export default async function Home() {
  const NUMBER_OF_PRODUCTS_FOR_HOME_PAGE = 25;
  // List of randomly selected products
  const randomProducts = await getRandomProducts(
    NUMBER_OF_PRODUCTS_FOR_HOME_PAGE
  );
  // Mapped to the structure that allows them to be displayed in a grid
  const productsToDisplay = await mapProductsToImages(randomProducts, 640, 853);

  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;

  return (
    <main className="flex flex-col gap-8 w-full">
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
      <div className="flex flex-col gap-2">
        <SectionHeading text={"We know you'll love"} />
        <ProductCarousel
          customerLoggedIn={accountTypeLoggedIn === EAccountTypes.customer}
          products={productsToDisplay}
          imageWidth={224}
          imageHeight={300}
        />
      </div>
      {accountTypeLoggedIn === EAccountTypes.customer && (
        <div className="flex flex-col gap-2">
          <SectionHeading text={"Recently viewed products"} />
          <ProductViewHistory
            customerLoggedIn={accountTypeLoggedIn === EAccountTypes.customer}
            imageWidth={224}
            imageHeight={300}
          />
        </div>
      )}
    </main>
  );
}
