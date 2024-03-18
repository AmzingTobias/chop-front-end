import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

const About = () => {
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
        <div className="flex flex-col gap-8 sm:gap-4">
          <p>
            Welcome to our vibrant online marketplace, where convenience meets
            quality and variety. At chop, we take pride in offering an
            unparalleled shopping experience tailored to your needs. Our
            platform boasts a diverse array of products, ranging from the latest
            tech gadgets to timeless fashion staples, ensuring there&apos;s
            something for everyone.
          </p>
          <p>
            One of the cornerstones of our service is our commitment to customer
            satisfaction, which is why we provide free delivery on all orders.
            We understand the importance of swift and cost-effective shipping,
            so you can enjoy your purchases without the added hassle of shipping
            fees. Whether you&apos;re shopping for a last-minute gift or
            stocking up on essentials, our seamless delivery process ensures
            your items reach you in no time.
          </p>
          <p>
            What sets us apart is our dedication to curating a comprehensive
            selection of products from trusted brands and emerging designers
            alike. From household essentials to niche hobby supplies, we strive
            to cater to every interest and preference. Explore our intuitive
            interface to discover an extensive range of categories, each
            offering a carefully curated collection of items handpicked for
            their quality and value.
          </p>
          <p>
            With chop, shopping is not just a transaction; it&apos;s an
            experience. Our user-friendly platform is designed to streamline
            your browsing and purchasing journey, making it easier than ever to
            find exactly what you&apos;re looking for. Whether you&apos;re a
            seasoned online shopper or new to the world of ecommerce, our
            intuitive interface and responsive customer support ensure a
            seamless experience from start to finish.
          </p>
          <p>
            Join us today and unlock a world of endless possibilities. From free
            delivery to a diverse selection of products, chop is your one-stop
            destination for all your shopping needs. Start exploring now and
            experience the convenience of online shopping at its finest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
