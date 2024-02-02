import { IProductQuestionAnswer } from "@/app/data/products";
import ProductQuestionAnswerRating from "./ProductQuestionAnswerRating";
import { EAccountTypes } from "@/app/data/auth";

interface IProductQuestionAnswerProps {
  answer: IProductQuestionAnswer;
  accountTypeLoggedIn: EAccountTypes | undefined;
}

const ProductQuestionAnswer: React.FC<IProductQuestionAnswerProps> = ({
  answer,
  accountTypeLoggedIn,
}) => {
  return (
    <div className="flex flex-row gap-2 bg-accent w-full text-accent-foreground p-2 rounded-md ">
      <p>{answer.answer}</p>
      <div className="ml-auto">
        <ProductQuestionAnswerRating
          overallRating={answer.overallRating}
          answerId={answer.id}
          customerLoggedIn={accountTypeLoggedIn === EAccountTypes.customer}
        />
      </div>
    </div>
  );
};

export default ProductQuestionAnswer;
