import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ImagePreview from "./ImagePreview";

interface IImageToUploadListProps {
  imageUrls: string[];
  swapImage: (indexOne: number, indexTwo: number) => void;
  removeImage: (index: number) => void;
}

const ImageToUploadList: React.FC<IImageToUploadListProps> = ({
  imageUrls,
  swapImage,
  removeImage,
}) => {
  return (
    <ScrollArea className="w-full overflow-clip overflow-x-scroll">
      <div className="flex flex-grow gap-2 py-2">
        {imageUrls.map((image, index) => (
          <ImagePreview
            key={index}
            canSwapLeft={index !== 0}
            canSwapRight={index < imageUrls.length - 1}
            height={300}
            width={300}
            position={index}
            swapImage={swapImage}
            removeImage={removeImage}
            url={image}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ImageToUploadList;
