import { Raleway } from "next/font/google";
import Link from "next/link";
const raleway = Raleway({ subsets: ["latin"] });

const WebsiteTitle = () => {
  return (
    <div className="w-full">
      <h1
        className={`text-5xl font-extrabold text-primary hover:opacity-80 text-center select-none ${raleway.className}`}
      >
        <Link href="/">chop</Link>
      </h1>
    </div>
  );
};

export default WebsiteTitle;
