import React from "react";
import styles from "@/app/[lang]/page.module.css";
import ImageWithPlaceholder from "@/components/commons/ImageMetaData";

function ProductLogo() {
  return (
    <section>
      <figure className={styles.mainTitle}>
        {/*<Image src={Icon} />*/}

        <ImageWithPlaceholder imgSrc={"/public/home.svg"} />
      </figure>
    </section>
  );
}
export default ProductLogo;
