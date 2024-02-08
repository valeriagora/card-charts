import { CardContainer, SmToMdChart } from "./styledComponents";
import styles from "@/app/page.module.css";
export const DndCard = ({ title, children, size }: any) => {
  return (
    <>
      <CardContainer size={size} id="capture">
        <h3 className={styles.title}>
          Which words would you use to describe the TV promo?
        </h3>
        <SmToMdChart>{children}</SmToMdChart>
      </CardContainer>
    </>
  );
};
