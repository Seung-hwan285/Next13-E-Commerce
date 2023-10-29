import React from "react";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
import Image from "next/image";

type Image = {
  imgSrc: string;
};

async function ImageWithPlaceholder({ imgSrc }: Image) {
  const buffer = await fs.readFile(`.${imgSrc}`);

  const obj = {
    size: 95,
  };

  const { base64, css } = await getPlaiceholder(buffer, obj);

  let src;

  const sliceSrc = imgSrc.split("/")[2];

  switch (sliceSrc) {
    case "home.svg":
      src = await import("/public/home.svg");
      break;
  }

  const imageStyle = {
    border: "1px solid #fff",
    maxWidth: "100%",
    height: "30%",
    marginTop: "20px",
  };

  return (
    <Image
      src={src}
      alt={"main-title"}
      quality={30}
      sizes="100vw"
      placeholder="blur"
      style={imageStyle}
      blurDataURL={base64}
    />
  );
}
export default ImageWithPlaceholder;
