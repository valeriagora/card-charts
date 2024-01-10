import { CardContainer, SmToMdChart } from "./styledComponents";
import styles from "../app/page.module.css";
import { Image } from "./Image";
import { CardSize } from "@/app/bar/types";
export const DndCard = ({ title, children, size, imageUrl }: any) => {
  return (
    <>
      <CardContainer size={size} id="capture">
        <h3 className={styles.title}>
          Which words would you use to describe the TV promo?
        </h3>
        <SmToMdChart size={size}>
          {children}
          {imageUrl && size !== CardSize.small && <Image url={imageUrl} />}
        </SmToMdChart>
      </CardContainer>
    </>
  );
};
