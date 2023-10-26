import Image from "next/image";
import Link from "next/link";

type TImageDetails = {
  src: string;
  altText: string;
  width: number;
  height: number;
};

export interface IAdBannerProps {
  image: TImageDetails;
  link: string;
}

const AdBanner: React.FC<IAdBannerProps> = ({ image, link }) => {
  return (
    <div className="flex w-full">
      <Link href={link}>
        <Image
          alt={image.altText}
          src={image.src}
          height={image.height}
          width={image.width}
        />
      </Link>
    </div>
  );
};

export default AdBanner;
