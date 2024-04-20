import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaffProductQuestions from "./StaffProductQuestions";
import ProductReviews from "./ProductReviews";

interface IProductQuestionReviewTabsProps {
  productId: number;
}

const ProductQuestionReviewTabs: React.FC<IProductQuestionReviewTabsProps> = ({
  productId,
}) => {
  return (
    <Tabs defaultValue="reviews" className="">
      <TabsList className="">
        <TabsTrigger value="reviews" className="text-lg">
          Reviews
        </TabsTrigger>
        <TabsTrigger value="questions" className="text-lg">
          Questions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="reviews">
        <ProductReviews productId={productId} />
      </TabsContent>
      <TabsContent value="questions">
        {" "}
        <StaffProductQuestions productId={productId} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductQuestionReviewTabs;
