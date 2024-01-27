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
      <div className="text-bold justify-start font-bold">{title}</div>
      <div className="ml-auto mr-auto justify-center">{centerContent}</div>
      <div
        className="ml-auto justify-end font-semibold text-secondary"
        onClick={() => onChangeClick()}
      >
        <p className="cursor-pointer hover:underline">Change</p>
      </div>
    </div>
  );
};

export default ChangeSection;
