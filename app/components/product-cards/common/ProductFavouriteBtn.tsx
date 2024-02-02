"use client";

import { removeProductFromFavourite } from "@/app/data/products";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface IProductFavouriteBtnProps {
  customerLoggedIn: boolean;
  productId: number;
}

const ProductFavouriteBtn: React.FC<IProductFavouriteBtnProps> = ({
  customerLoggedIn,
  productId,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  const setProductAsFavourite = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${productId}/favourite`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "POST",
      }
    )
      .then((response) => {
        if (response.ok) {
          // Marked as favourite
          setIsFavourite(true);
          setButtonDisabled(false);
        } else {
          // An error occured
          setIsFavourite(false);
          setButtonDisabled(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsFavourite(false);
        setButtonDisabled(true);
      });
  };

  useEffect(() => {
    const fetchIsProductFavourite = () => {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${productId}/favourite`,
        {
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          method: "GET",
        }
      )
        .then((response) => {
          if (response.ok) {
            response
              .json()
              .then((jsonData) => {
                setIsFavourite(jsonData.favourited);
                setButtonDisabled(false);
              })
              .catch((err) => {
                console.error(err);
                setIsFavourite(false);
                setButtonDisabled(true);
              });
          }
        })
        .catch((err) => {
          console.error(err);
          setIsFavourite(false);
          setButtonDisabled(true);
        });
    };
    if (customerLoggedIn) {
      fetchIsProductFavourite();
    }
  }, [customerLoggedIn, productId]);

  if (!customerLoggedIn) {
    return <></>;
  }

  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        if (!buttonDisabled) {
          if (isFavourite) {
            removeProductFromFavourite(productId)
              .then((removed) => {
                setIsFavourite(!removed);
                setButtonDisabled(!removed);
              })
              .catch((err) => {
                console.error(err);
                setIsFavourite(false);
                setButtonDisabled(true);
              });
          } else {
            setProductAsFavourite();
          }
        }
      }}
      className={`relative flex justify-center cursor-default bg-accent rounded-full p-1.5 text-xl ${
        !buttonDisabled ? "text-secondary" : "text-primary "
      }`}
    >
      <AiFillHeart
        className={`absolute ${!buttonDisabled ? "hover:opacity-100" : ""} ${
          isFavourite ? "opacity-100" : "opacity-0"
        }`}
      />
      <AiOutlineHeart style={{ strokeWidth: "50px" }} />
    </div>
  );
};

export default ProductFavouriteBtn;
