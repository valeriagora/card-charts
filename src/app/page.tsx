"use client";
import { ReactECharts, ReactEChartsProps } from "@/components/ReactECharts";
import { lgOption, smOption } from "@/data";
import { styled } from "@mui/material";
import { useEffect } from "react";
import styles from "./page.module.css";
// console.log("lgOption", lgOption.series.data.length);
const LgChart = styled("div")<{ height?: number }>(({ height }) => ({
  border: "1px solid #ddd",
  // height,
  height: height < 120 ? "120px" : height,
}));

const SmallCard = ({ title, children }: any) => {
  return (
    <div className={styles.main}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      <div className={styles.smChart}>{children}</div>
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
      <LargeCard>
        <ReactECharts option={lgOption} />
      </LargeCard>
    </>
  );
}
