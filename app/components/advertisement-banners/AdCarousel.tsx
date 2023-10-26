"use client";

import { useState } from "react";
import AdBanner, { IAdBannerProps } from "./AdBanner";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsPauseCircleFill,
  BsFillPlayCircleFill,
} from "react-icons/bs";

interface IAdCarousel {
  adsToDisplay: IAdBannerProps[];
}

const AdCarousel: React.FC<IAdCarousel> = ({ adsToDisplay }) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const nextSlide = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex + 1 >= adsToDisplay.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex - 1 < 0 ? adsToDisplay.length - 1 : prevIndex - 1
    );
  };

  const carouselArrowCommonStyles =
    "hover:opacity-100 hover:cursor-pointer hidden opacity-25 transition-opacity duration-400 text-white absolute w-8 h-8 md:flex";

  return (
    <div className="flex w-full items-center relative overflow-hidden">
      {adsToDisplay.map((adToDisplay, index) => (
        <div
          key={index}
          className="flex flex-shrink-0 w-full transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
        >
          <AdBanner image={adToDisplay.image} link={adToDisplay.link} />
        </div>
      ))}
      <BsArrowLeftCircleFill
        className={`${carouselArrowCommonStyles} left-4`}
        onClick={prevSlide}
      />
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className={`${carouselArrowCommonStyles} right-4`}
      />
      <span className="hidden lg:flex absolute justify-center left-0 right-0 items-center lg:bottom-2 xl:bottom-4">
        {adsToDisplay.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAdIndex(index)}
            className={`hover:cursor-pointer h-3 w-3 p-2 rounded-full border-none outline-none mx-2 ${
              index === currentAdIndex
                ? "cursor-default bg-blue-400"
                : "bg-gray-600"
            }`}
          ></button>
        ))}
        <BsPauseCircleFill className="hover:cursor-pointer ml-4 text-white text-3xl" />
      </span>
    </div>
  );
};

export default AdCarousel;
