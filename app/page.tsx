import ProductGridMini from "./components/product-cards/ProductGridMini";
import { getRandomProducts, mapProductsToImages } from "./data/products";

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
      <ProductGridMini gridColumnMinRem={16} products={productsToDisplay} />
    </main>
  );
}
