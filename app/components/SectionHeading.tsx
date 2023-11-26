import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

interface ISectionHeadingProps {
  text: string;
}

const SectionHeading: React.FC<ISectionHeadingProps> = ({ text }) => {
  return (
    <h2
      className={`uppercase text-center w-full font-light text-4xl ${raleway.className}`}
    >
      {text}
    </h2>
  );
};

export default SectionHeading;
