"use client";
import { ReactECharts } from "@/components/ReactECharts";
import { getLgOption, getMdOption, smOption } from "@/data";
import { styled } from "@mui/material";
import { useState } from "react";
import styles from "./page.module.css";
import { Button } from "@mui/material";

const LgChart = styled("div")<{ height?: number }>(({ height }) => ({
  height: height > 188 ? height : 188,
  position: "relative",
  boxSizing: "border-box",
}));

const Image = ({ url }) => {
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

const SmallCard = ({ title, children }: any) => {
  return (
    <div className={styles.sm}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      <div className={styles.smChart}>{children}</div>
    </div>
  );
};
const MediumCard = ({ title, children, imageUrl }: any) => {
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
const LargeCard = ({ data, title, children, imageUrl }: any) => {
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
  const url =
    "https://images.unsplash.com/photo-1702068213563-2d29f10639ec?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [imageUrl, setImageUrl] = useState("");
  const [data] = useState([
    {
      value: 10,
      name: "Search Engine Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine",
    },
    {
      value: 20,
      name: "Search Engine",
    },
    { value: 25, name: "Other" },
    { value: 15, name: "Option 1" },
    { value: 2, name: "Option 2" },
    { value: 3, name: "Option 3" },
    { value: 5, name: "Option 4" },
    { value: 3, name: "Option 5 Engine Search Engine Search Engine Search" },
    { value: 2, name: "Option 6" },
    { value: 2, name: "Option 7" },
    { value: 2, name: "Option 8" },
    { value: 2, name: "Option 9" },
    { value: 2, name: "Option 10" },
    { value: 2, name: "Option 11" },
    { value: 8, name: "Option 12" },
    { value: 2, name: "Option 13" },
  ]);

  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };

  const withImage = !!imageUrl;
  return (
    <>
      <Button sx={{ marginBottom: 4 }} variant="contained" onClick={toggleImg}>
        Toggle image
      </Button>
      <SmallCard>
        <ReactECharts option={smOption(data)} />
      </SmallCard>
      <MediumCard imageUrl={imageUrl}>
        <ReactECharts option={getMdOption(data, withImage)} />
      </MediumCard>
      <LargeCard data={data} imageUrl={imageUrl}>
        <ReactECharts option={getLgOption(data, withImage)} />
      </LargeCard>
    </>
  );
}
