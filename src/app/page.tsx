"use client";
import { ReactECharts } from "@/components/ReactECharts";
import { getLgOption, getMdOption, smOption } from "@/data";
import { styled } from "@mui/material";
import styles from "./page.module.css";

const LgChart = styled("div")<{ height?: number }>(({ height }) => ({
  height,
  position: "relative",
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
const LargeCard = ({ title, children, imageUrl }: any) => {
  return (
    <div className={styles.lg}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      <LgChart height={getLgOption().series.data.length * 24 + 20}>
        {children}
        {imageUrl && <Image url={imageUrl} />}
      </LgChart>
    </div>
  );
};
export default function Home() {
  // const imageUrl =
  // "https://images.unsplash.com/photo-1702068213563-2d29f10639ec?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const imageUrl = "";
  return (
    <>
      <SmallCard>
        <ReactECharts option={smOption} />
      </SmallCard>
      <MediumCard imageUrl={imageUrl}>
        <ReactECharts option={getMdOption(!!imageUrl)} />
      </MediumCard>
      <LargeCard imageUrl={imageUrl}>
        <ReactECharts option={getLgOption(!!imageUrl)} />
      </LargeCard>
    </>
  );
}
