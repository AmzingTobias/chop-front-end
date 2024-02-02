import Image from "next/image";
import Link from "next/link";

type TImageDetails = {
  src: string;
  altText: string;
  width: number;
  height: number;
};

export interface IAdBannerProps {
  className?: string;
  image: TImageDetails;
  link?: string;
}

const AdBanner: React.FC<IAdBannerProps> = ({
  className = "",
  image,
  link,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {link ? (
        <Link href={link}>
          <Image
            className="rounded-lg"
            alt={image.altText}
            src={image.src}
            height={image.height}
            width={image.width}
          />
        </Link>
      ) : (
        <Image
          className="rounded-lg"
          alt={image.altText}
          src={image.src}
          height={image.height}
          width={image.width}
        />
      )}
    </div>
  );
};

export default AdBanner;
