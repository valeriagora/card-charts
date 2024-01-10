import { styled } from "@mui/material";
import { Image } from "./Image";
import styles from "../app/page.module.css";
export const LgChart = styled("div")<{ height: number }>(({ height }) => ({
  height: height > 188 ? height : 188,
  // height,
  position: "relative",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  border: "1px solid #ddd",
}));
const LargeContainer = styled("div")(({}) => ({
  margin: "10px 0",
  padding: "12px 20px 24px",
  width: "100%",
  minHeight: "272px",
  background: "#222430",
  borderRadius: "16px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
export const LargeCard = ({ data, title, children, imageUrl }: any) => {
  return (
    <LargeContainer>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      <LgChart height={data.length * 24}>
        {children}
        {imageUrl && <Image url={imageUrl} />}
      </LgChart>
    </LargeContainer>
  );
};
