import { getProductImages } from "@/app/data/images";
import {
  getProductQuestionsWithAnswers,
  getProductWithId,
  getProductsOfSameStyle,
  getRandomProducts,
  getReviewsForProduct,
  mapProductsToImages,
} from "@/app/data/products";
import ProductImageDisplay from "./ProductImageDisplay";
import MainProductSection from "./MainProductSection";
import PurchaseSection from "./PurchaseSection";
import ProductCarousel from "@/app/components/product-cards/ProductCarousel";
import SectionHeading from "@/app/components/SectionHeading";
import ProductQuestions from "./ProductQuestions";
import { cookies } from "next/headers";
import AskAProductQuestionForm from "./AskAProductQuestionForm";
import {
  EAccountTypes,
  getAccountTypeFromCookie,
  getCustomerIdFromCookie,
} from "@/app/data/auth";
import ProductReviewsSection from "./ProductReviewsSection";
import ProductViewHistory from "./ProductViewHistory";

export async function generateStaticParams() {
  const productIds = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/all`
  ).then((res) => res.json());

  return productIds.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
}

const ProductPage = async ({ params }: { params: { id: number } }) => {
  const productDetails = await getProductWithId(params.id);
  if (productDetails === null) {
    return null;
  }
  const productImages = (await getProductImages(params.id)).map((image) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/images/products/${params.id}/${image.fileName}`;
  });
  const sameStyleProducts = await getProductsOfSameStyle(params.id);
  const sameStyleProductsWithImages = await mapProductsToImages(
    sameStyleProducts,
    75,
    100
  );

  const productQuestions = await getProductQuestionsWithAnswers(params.id);
  // TODO - Make tailored to what customers actually looked at, rather than random
  const customersAlsoLookedAt = await mapProductsToImages(
    await getRandomProducts(25),
    640,
    853
  );

  const reviewsForProduct = await getReviewsForProduct(params.id);

  const authCookie = cookies().get("auth");
  const accountTypeLoggedIn = authCookie
    ? getAccountTypeFromCookie(authCookie.value)
    : undefined;
  const customerId = authCookie
    ? getCustomerIdFromCookie(authCookie.value)
    : undefined;

  const averageReviews =
    reviewsForProduct.length > 0
      ? reviewsForProduct.reduce(
          (current, review) => current + review.rating,
          0
        ) / reviewsForProduct.length
      : 0;

  return (
    <main className="flex flex-col w-full overflow-x-clip p-1 space-y-8">
      {customerId !== undefined && <ProductViewHistory productId={params.id} />}
      <div className="flex flex-col md:flex-row w-full space-y-8 md:space-y-0 md:space-x-6 items-center md:items-start">
        <ProductImageDisplay images={productImages} />
        <MainProductSection
          accountTypeLoggedIn={accountTypeLoggedIn}
          productId={productDetails.id}
          productName={productDetails.name}
          reviewCount={reviewsForProduct.length}
          rating={averageReviews}
          productDescription={
            productDetails.description === undefined
              ? ""
              : productDetails.description
          }
          productBrand={
            productDetails.brandId === undefined ||
            productDetails.brandName === undefined
              ? undefined
              : {
                  id: productDetails.brandId,
                  name: productDetails.brandName,
                }
          }
        />
        <div className="min-w-full max-w-full md:min-w-[300px]  md:max-w-[300px]">
          <PurchaseSection
            customerLoggedIn={accountTypeLoggedIn === EAccountTypes.customer}
            productId={productDetails.id}
            price={productDetails.price}
            similarStyleProducts={sameStyleProductsWithImages}
            productAvailable={productDetails.available}
            productStockCount={productDetails.stock_count}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <SectionHeading text={"Customers also looked at"} />
        <ProductCarousel
          customerLoggedIn={customerId !== undefined}
          products={customersAlsoLookedAt}
          imageWidth={224}
          imageHeight={300}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <SectionHeading text="Questions asked by customers" />
        <div className="flex flex-col space-y-6">
          {productQuestions.length > 0 ? (
            <ProductQuestions
              questions={productQuestions}
              accountTypeLoggedIn={accountTypeLoggedIn}
            />
          ) : (
            <div className="w-full flex items-center justify-center my-6">
              <h2 className="text-3xl italic font-light">
                No questions asked yet
              </h2>
            </div>
          )}
          {customerId !== undefined && (
            <AskAProductQuestionForm productId={params.id} />
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <SectionHeading text="Reviews" />
        <ProductReviewsSection
          loggedInCustomerId={customerId}
          productId={params.id}
          initialReviews={reviewsForProduct}
        />
      </div>
    </main>
  );
};

export default ProductPage;
