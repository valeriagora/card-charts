import styles from "../app/page.module.css";
import { Image } from "./Image";

export const MediumCard = ({
  title,
  children,
  imageUrl,
  type = "pie",
}: any) => {
  return (
    <div className={styles.md}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      <div className={styles.mdChart}>
        {children}
        {imageUrl && <Image url={imageUrl} />}
      </div>
    </div>
  );
};
