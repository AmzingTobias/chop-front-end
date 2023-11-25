interface IPriceLabel {
  price: number;
  discountPrice?: number;
}

const PriceLabel: React.FC<IPriceLabel> = ({ price, discountPrice }) => {
  return (
    <div>
      {discountPrice === undefined ? (
        <h4 className="text-lg font-medium ">£{price.toFixed(2)}</h4>
      ) : (
        <h4 className="text-lg font-medium">
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
