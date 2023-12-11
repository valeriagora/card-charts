"use client";
import { ReactECharts, ReactEChartsProps } from "@/components/ReactECharts";
import { lgOption, mdOption, smOption } from "@/data";
import { styled } from "@mui/material";
import styles from "./page.module.css";

// console.log("lgOption", lgOption.series.data.length);

const LgChart = styled("div")<{ height?: number }>(({ height }) => ({
  // border: "1px solid #ddd",
  // height,
  position: "relative",
  height: height < 120 ? "120px" : height,
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
        // border: "1px solid pink",
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
const MediumCard = ({ title, children }: any) => {
  return (
    <div className={styles.md}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      <div className={styles.mdChart}>
        {children}
        <Image url="https://images.unsplash.com/photo-1702068213563-2d29f10639ec?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </div>
  );
};
const LargeCard = ({ title, children }: any) => {
  return (
    <div className={styles.lg}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      <LgChart height={lgOption.series.data.length * 24 + 20}>
        {children}
        <Image url="https://images.unsplash.com/photo-1702068213563-2d29f10639ec?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </LgChart>
    </div>
  );
};
export default function Home() {
  return (
    <>
      <SmallCard>
        <ReactECharts option={smOption} />
      </SmallCard>
      <MediumCard>
        <ReactECharts option={mdOption} />
      </MediumCard>
      <LargeCard>
        <ReactECharts option={lgOption} />
      </LargeCard>
    </>
  );
}
