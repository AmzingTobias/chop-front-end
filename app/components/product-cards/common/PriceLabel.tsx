interface IPriceLabel {
  price: number;
  discountPrice?: number;
}

const PriceLabel: React.FC<IPriceLabel> = ({ price, discountPrice }) => {
  return (
    <div>
      {discountPrice === undefined ? (
        <h4 className="text-lg font-bold text-blue-800">£{price.toFixed(2)}</h4>
      ) : (
        <h4 className="text-lg font-bold">
          <span className="text-blue-800 text-sm line-through decoration-2">
            £{price.toFixed(2)}
          </span>{" "}
          <span className="text-pink-700">
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
