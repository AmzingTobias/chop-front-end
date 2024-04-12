import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

const Delivery = () => {
  return (
    <div className="flex flex-col w-full items-center gap-8">
      <div className="w-full sm:w-3/4 bg-accent p-4 rounded-md">
        <h1
          className={`text-5xl font-extrabold text-primary text-center select-none ${raleway.className}`}
        >
          chop
        </h1>
      </div>
      <div className="sm:w-3/4">
        <div className="flex flex-col gap-8 sm:gap-8">
          <div className="flex flex-col gap-6 sm:gap-4">
            <h2 className="text-2xl font-semibold">Delivery</h2>
            <p>
              One of the cornerstones of our service is our commitment to
              customer satisfaction, which is why we provide free delivery on
              all orders. We understand the importance of swift and
              cost-effective shipping, so you can enjoy your purchases without
              the added hassle of shipping fees. Whether you&apos;re shopping
              for a last-minute gift or stocking up on essentials, our seamless
              delivery process ensures your items reach you in no time.
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:gap-4">
            <h2 className="text-2xl font-semibold">Returns</h2>
            <p>
              As a company committed to delivering top-quality products and
              ensuring customer satisfaction, we understand the importance of
              transparency in our policies. It is with this principle in mind
              that we must communicate our stance on returns: under no
              circumstances do we accept returns for our products.
            </p>
            <p>
              This decision is not made lightly but is grounded in several key
              considerations. Firstly, our products undergo rigorous quality
              control measures to ensure they meet the highest standards before
              they ever reach our customers. We invest considerable time and
              resources into crafting each item to perfection, and we stand
              firmly behind the quality of our offerings.
            </p>
            <p>
              Furthermore, our no-return policy helps us maintain fair pricing
              for all our customers. By eliminating the costs associated with
              processing returns and refurbishing products, we can focus our
              resources on continually improving our products and offering them
              at competitive prices. This approach allows us to prioritize
              long-term value and sustainability, benefiting both our customers
              and our business in the process.
            </p>
            <p>
              While we recognize that unforeseen circumstances may arise, such
              as shipping damages or product defects, we address such issues
              through alternative means, such as comprehensive warranties and
              responsive customer support. Our dedicated team is always
              available to assist with any concerns or inquiries, ensuring that
              our customers receive the assistance they need promptly and
              efficiently.
            </p>
            <p>
              In adhering to our no-return policy, we aim to foster trust and
              confidence in our products, demonstrating our unwavering
              commitment to excellence and customer satisfaction. We appreciate
              the understanding and support of our valued customers as we
              continue to uphold these principles and deliver exceptional
              products and service experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
