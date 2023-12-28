"use client";
import styles from "./page.module.css";
import { Button, styled } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardSize } from "./bar/page";

export const LgChart = styled("div")<{ height?: number }>(({ height }) => ({
  height: height > 188 ? height : 188,
  // height,
  position: "relative",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  border: "1px solid #ddd",
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
const cardWidths = {
  small: 320,
  medium: 656,
  large: "100%",
};
const cardHeights = {
  small: 200,
  medium: 416,
  large: "100%",
};
const CardContainer = styled("div")<{ size: CardSize }>(({ size }) => ({
  padding: "12px 20px",
  width: cardWidths[size],
  height: cardHeights[size],
  background: " #222430",
  borderRadius: 16,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  //
  overflow: "hidden",
}));
const SmToMdChart = styled("div")<{ size: "sm" | "md" }>(({ size }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  border: "1px solid slateblue",
}));

export const DndCard = ({ title, children, size, imageUrl }: any) => {
  return (
    <>
      <CardContainer size={size} id="capture">
        <h3 className={styles.title}>
          Which words would you use to describe the TV promo?
        </h3>
        <SmToMdChart size={size}>
          {children}
          {imageUrl && size !== "sm" && <Image url={imageUrl} />}
        </SmToMdChart>
      </CardContainer>
    </>
  );
};
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

export default function Home() {
  return <div />;
}
