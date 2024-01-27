import { ReactNode } from "react";

interface IChangeSectionProps {
  title: string;
  centerContent: ReactNode | undefined;
  onChangeClick: () => void;
}

const ChangeSection: React.FC<IChangeSectionProps> = ({
  title,
  centerContent,
  onChangeClick,
}) => {
  return (
    <div className="flex flex-row">
      <div className="flex-auto w-full font-bold">{title}</div>
      <div className="flex-auto w-full flex">{centerContent}</div>
      <div className="flex-auto w-full flex justify-end font-semibold text-secondary">
        <p
          className="cursor-pointer hover:underline select-none"
          onClick={() => onChangeClick()}
        >
          Change
        </p>
      </div>
    </div>
  );
};

export default ChangeSection;
