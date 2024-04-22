import { cn } from "@/lib/utils";

interface IPriceLabel {
  className?: string;
  price: number;
  discountPrice?: number;
}

const PriceLabel: React.FC<IPriceLabel> = ({
  price,
  discountPrice,
  className = "",
}) => {
  const priceLabelStyles = cn("text-lg font-medium", className);
  return (
    <div>
      {discountPrice === undefined ? (
        <h4 className={`${priceLabelStyles}`}>£{price.toFixed(2)}</h4>
      ) : (
        <h4 className={`${priceLabelStyles}`}>
          <span className=" text-sm font-light line-through decoration-2">
            £{price.toFixed(2)}
          </span>{" "}
          <span>
            {`£${discountPrice.toFixed(2)}`}{" "}
            <span className="text-sm">
              {`(${(((discountPrice - price) / price) * 100).toFixed(0)}%)`}
            </span>
          </span>
        </h4>
      )}
    </div>
  );
};

export default PriceLabel;
