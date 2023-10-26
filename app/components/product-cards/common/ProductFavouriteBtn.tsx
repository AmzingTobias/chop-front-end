import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductFavouriteBtn = () => {
  //TODO Load from API
  const isFavourite = false;

  return (
    <div className="relative flex justify-center  cursor-default bg-gray-100 rounded-full p-1.5">
      <AiFillHeart
        className={`absolute hover:opacity-100 text-red-500 ${
          isFavourite ? "opacity-100" : "opacity-0"
        }`}
      />
      <AiOutlineHeart
        className={`text-red-500 hover:opacity-0 ${
          isFavourite ? "opacity-0" : ""
        }`}
      />
    </div>
  );
};

export default ProductFavouriteBtn;
