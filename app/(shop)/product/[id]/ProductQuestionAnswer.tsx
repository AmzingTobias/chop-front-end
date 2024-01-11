import { IProductQuestionAnswer } from "@/app/data/products";
import ProductQuestionAnswerRating from "./ProductQuestionAnswerRating";

interface IProductQuestionAnswerProps {
  answer: IProductQuestionAnswer;
  userLoggedIn: boolean;
}

const ProductQuestionAnswer: React.FC<IProductQuestionAnswerProps> = ({
  answer,
  userLoggedIn,
}) => {
  return (
    <div className="flex flex-row gap-2 bg-accent w-full text-accent-foreground p-2 rounded-md ">
      <p>{answer.answer}</p>
      <div className="ml-auto">
        <ProductQuestionAnswerRating
          overallRating={answer.overallRating}
          answerId={answer.id}
          userLoggedIn={userLoggedIn}
        />
      </div>
    </div>
  );
};

export default ProductQuestionAnswer;
