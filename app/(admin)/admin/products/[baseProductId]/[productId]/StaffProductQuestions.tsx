"use client";
import {
  IProductQuestion,
  getProductQuestionsWithAnswers,
} from "@/app/data/products";
import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductQuestion from "./ProductQuestion";

interface IStaffProductQuestionsProps {
  productId: number;
}

const StaffProductQuestions: React.FC<IStaffProductQuestionsProps> = ({
  productId,
}) => {
  const useData = () => {
    const [data, setData] = useState<IProductQuestion[] | undefined>(undefined);
    const refreshData = useCallback(() => {
      getProductQuestionsWithAnswers(productId)
        .then((dataFetched) => {
          setData(dataFetched);
        })
        .catch((err) => {
          console.error(err);
          setData([]);
        });
    }, [setData]);
    useEffect(() => {
      refreshData();
    }, [refreshData]);
    return { data, refreshData };
  };
  const { data: questions, refreshData: refreshQuestions } = useData();

  if (questions === undefined) {
    return null;
  }

  if (questions.length === 0) {
    return (
      <div className="w-full flex items-center justify-center mt-32">
        <h2 className="text-4xl italic">No questions asked</h2>
      </div>
    );
  }

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
              className=" flex whitespace-normal"
              value={`${question.id}`}
              key={question.id}
            >
              {question.question}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      <div className="ml-4 basis-3/4 w-full ">
        {questions.map((question) => (
          <TabsContent
            value={`${question.id}`}
            key={question.id}
            className="mt-0"
          >
            <ProductQuestion
              question={question}
              refreshQuestions={refreshQuestions}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default StaffProductQuestions;
