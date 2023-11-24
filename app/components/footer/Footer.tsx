import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

interface IFooterColumnContentsProps {
  colName: string;
  navLinks: { display: string; link: string }[];
}

const FooterColumnContents: React.FC<IFooterColumnContentsProps> = ({
  colName,
  navLinks,
}) => {
  return (
    <>
      <p className="font-bold">{colName}</p>
      <div className="flex flex-col">
        {navLinks.map((navLink, index) => (
          <a
            key={index}
            href={navLink.link}
            className="w-fit hover:text-accent-foreground/80"
          >
            {navLink.display}
          </a>
        ))}
      </div>
    </>
  );
};

interface IFooterConentsProps {
  columns: IFooterColumnContentsProps[];
}
const FooterContents: React.FC<IFooterConentsProps> = ({ columns }) => {
  return (
    <>
      {columns.map((col, index) => {
        return (
          <div
            key={index}
            className={`flex flex-col gap-1`}
            style={{
              width: `${(1 / columns.length) * 100}%`,
            }}
          >
            <FooterColumnContents
              colName={col.colName}
              navLinks={col.navLinks}
            />
          </div>
        );
      })}
    </>
  );
};

const FOOTER_CONTENTS: IFooterColumnContentsProps[] = [
  {
    colName: "Help & Information",
    navLinks: [
      { display: "Contact us", link: "/" },
      { display: "Track an order", link: "/" },
      { display: "Delivery & Returns", link: "/" },
    ],
  },
  {
    colName: "About chop",
    navLinks: [{ display: "About us", link: "/" }],
  },
  {
    colName: "More from chop",
    navLinks: [
      { display: "Gift vouchers", link: "/" },
      { display: "Mobile app", link: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground items-center flex justify-center mt-4 w-full py-[56px] sm:py-[112px]">
      <div
        className={`flex flex-col items-center gap-8 sm:items-start sm:gap-0 sm:flex-row ${raleway.className} w-full max-w-screen-2xl md:w-11/12`}
      >
        <FooterContents columns={FOOTER_CONTENTS} />
      </div>
    </footer>
  );
};
export default Footer;
