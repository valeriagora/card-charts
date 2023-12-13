"use client";
import styles from "./page.module.css";
import { Button, styled } from "@mui/material";
import Link from "next/link";

export const LgChart = styled("div")<{ height?: number }>(({ height }) => ({
  height: height > 188 ? height : 188,
  position: "relative",
  boxSizing: "border-box",
}));

export const Image = ({ url }) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-60px)",
        backgroundImage: `url(${url})`,
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1A1A25",
        width: 120,
        height: 120,
      }}
    />
  );
};

export const SmallCard = ({ title, children }: any) => {
  return (
    <div className={styles.sm}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo a?
      </h3>
      <div className={styles.smChart}>{children}</div>
    </div>
  );
};
export const MediumCard = ({ title, children, imageUrl }: any) => {
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
export const LargeCard = ({ data, title, children, imageUrl }: any) => {
  return (
    <div className={styles.lg}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      <LgChart height={data.length * 24}>
        {children}
        {imageUrl && <Image url={imageUrl} />}
      </LgChart>
    </div>
  );
};

export default function Home() {
  return <div />;
}
