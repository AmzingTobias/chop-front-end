"use client";

import Image from "next/image";
import { useState } from "react";

const WebsiteTitle = () => {
  const WEBSITE_TITLE = "chop";
  const [hover, setHover] = useState(false);

  const pathToChop = "../chop-fill.svg";
  const pathToChopHover = "../chop.svg";

  return (
    <Image
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      src={hover ? pathToChopHover : pathToChop}
      alt="Logo"
      width={170}
      height={36}
    />
  );
};

export default WebsiteTitle;
