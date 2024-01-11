"use client";
import { useCallback, useEffect, useState } from "react";
import { IoIosThumbsUp, IoIosThumbsDown } from "react-icons/io";
interface IProductQuestionAnswerRatingProps {
  answerId: number;
  overallRating: number;
  customerLoggedIn: boolean;
}

const ProductQuestionAnswerRating: React.FC<
  IProductQuestionAnswerRatingProps
> = ({ answerId, overallRating, customerLoggedIn }) => {
  const [answerRating, setAnswerRating] = useState(overallRating);
  const [userRating, setUserRating] = useState<boolean | undefined>(undefined);
  const [componentLoading, setComponentLoading] = useState(true);

  const fetchRating = useCallback(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/questions/answer/rating/${answerId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      }
    ).then((response) => {
      if (response.ok) {
        response.json().then((jsonData) => {
          setAnswerRating(jsonData.rating);
          if (typeof jsonData.userFoundReviewHelpful === "boolean") {
            setUserRating(jsonData.userFoundReviewHelpful);
          } else {
            setUserRating(undefined);
          }
        });
      }
    });
  }, [answerId]);

  useEffect(() => {
    setComponentLoading(false);
    fetchRating();
  }, [fetchRating]);

  const removeRating = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/questions/answer/rating`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          answerId: answerId,
        }),
      }
    ).then((response) => {
      fetchRating();
    });
  };

  const rateAnswer = (helpful: boolean) => {
    if (helpful === userRating) {
      removeRating();
    } else {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/questions/answer/rating`,
        {
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          method: typeof userRating === "boolean" ? "PUT" : "POST",
          body: JSON.stringify({
            answerId: answerId,
            helpful: helpful,
          }),
        }
      ).then((response) => {
        fetchRating();
      });
    }
  };

  return (
    <div className="flex space-x-2">
      {customerLoggedIn && (
        <button
          onClick={() => rateAnswer(true)}
          disabled={componentLoading}
          className={`disabled:text-primary ${
            userRating === true
              ? "text-secondary "
              : "text-accent-foreground hover:text-accent-foreground/80"
          }`}
        >
          <IoIosThumbsUp size="1.6rem" />
        </button>
      )}
      <p className="w-8 text-center font-semibold">{answerRating}</p>
      {customerLoggedIn && (
        <button
          onClick={() => rateAnswer(false)}
          disabled={componentLoading}
          className={`disabled:text-primary ${
            userRating === false
              ? "text-secondary "
              : "text-accent-foreground hover:text-accent-foreground/80"
          }`}
        >
          <IoIosThumbsDown size="1.6rem" />
        </button>
      )}
    </div>
  );
};

export default ProductQuestionAnswerRating;
