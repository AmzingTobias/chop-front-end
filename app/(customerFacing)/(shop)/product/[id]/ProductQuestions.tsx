import { IProductQuestion } from "@/app/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductQuestionAnswer from "./ProductQuestionAnswer";
import ProductQuestionPostAnswer from "./ProductQuestionPostAnswer";
import { EAccountTypes } from "@/app/data/auth";

interface IProductQuestionsProps {
  questions: IProductQuestion[];
  accountTypeLoggedIn: EAccountTypes | undefined;
}

const ProductQuestions: React.FC<IProductQuestionsProps> = ({
  questions,
  accountTypeLoggedIn,
}) => {
  return (
    <Tabs
      defaultValue={questions.length > 0 ? questions[0].id.toString() : "0"}
      className="flex flex-col sm:flex-row"
      orientation="vertical"
    >
      <TabsList className="sm:basis-1/4 p-0 w-[200px] bg-transparent justify-normal">
        <div className="flex flex-col w-full gap-2 p-2 rounded-sm shadow-md bg-accent">
          {questions.map((question) => (
            <TabsTrigger
              className="text-lg flex whitespace-normal"
              value={`${question.id}`}
              key={question.id}
            >
              {question.question}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      <div className="mt-4 sm:mt-0 sm:ml-2 md:ml-6 lg:ml-10 sm:basis-3/4 sm:w-full ">
        {questions.map((question) => (
          <TabsContent
            value={`${question.id}`}
            key={question.id}
            className="mt-0"
          >
            <div className="w-full flex-col space-y-4 mt-0 p-6 bg-primary flex shadow-md rounded-sm">
              <div className="flex flex-col md:flex-row">
                <h3 className="text-3xl font-semibold">{question.question}</h3>
                <p className="ml-auto italic">
                  Asked on{" "}
                  {new Date(
                    question.askedOn as unknown as string
                  ).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-col space-y-1">
                {question.answers &&
                  question.answers.map((answer) => {
                    return (
                      <ProductQuestionAnswer
                        key={answer.id}
                        answer={answer}
                        accountTypeLoggedIn={accountTypeLoggedIn}
                      />
                    );
                  })}
              </div>
              {accountTypeLoggedIn !== undefined && (
                <>
                  {question.answers !== undefined &&
                    question.answers.length > 0 && (
                      <hr className="border-accent" />
                    )}
                  <ProductQuestionPostAnswer questionId={question.id} />
                </>
              )}
            </div>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default ProductQuestions;
