"use client";
import { ReactECharts } from "@/components/ReactECharts";
import React, { useState } from "react";
import { LargeCard, MediumCard, SmallCard } from "../page";
import { smOption, getMdOption, getLgOption } from "@/data/bar";
import { url } from "../pie/page";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
type OptionSourceData = [string, string | number][];
const barData: OptionSourceData = [
  ["product", "amount"],
  // ['...', 0],
  ["Close-ended 2 Boring dassadsda dssdds", 5],
  ["Entertaining 2", 10],
  // ["Exciting 2", 5],
  // ["Boring", 5],

  // ["Engaging", 5],
  // ["Close-ended", 10],
  // ["Intriguing", 15],
  // ["Entertaining", 20],
  // ["Exciting", 25],
  // [
  //   "Boring dassadsda dssdds Boring dassadsda dssdds Boring dassadsda dssdds",
  //   50,
  // ],
  // ["Boring dassadsda", 1],
  // ["Boring 3", 3],
  // ["Engaging 4", 5],
  // ["Close-ended 4", 10],
  // ["Intriguing 4", 15],
  // ["Entertaining 4", 20],
  // ["Exciting 4", 25],
  // [
  //   "Boring 4 dassadsda dssdds Boring dassadsda dssdds Boring dassadsda dssdds",
  //   50,
  // ],
  // ["Boring 4 dassadsda", 1],
  // ["Boring 4 3", 3],
];

const BarChartMdContainer = styled("div")<{ height: number }>(({ height }) => ({
  height: height > 344 ? 344 : height,
  width: "100%",
  border: "1px solid crimson",
}));
const BarChartSmContainer = styled("div")<{ height: number }>(({ height }) => ({
  height: height > 120 ? 120 : height,
  width: "100%",
  border: "1px solid crimson",
}));
const BarChartLgContainer = styled("div")<{ height: number }>(({ height }) => ({
  // height: height > 188 ? 188 : height,
  height,
  width: "100%",
  border: "1px solid crimson",
}));

const BarContainer = ({ length, children, size }) => {
  const height = length * 24;
  if (size === "sm") {
    return (
      <BarChartSmContainer height={height}>{children}</BarChartSmContainer>
    );
  }
  if (size === "lg") {
    return (
      <BarChartLgContainer height={height}>{children}</BarChartLgContainer>
    );
  }
  return (
    <BarChartMdContainer height={length * 24}>{children}</BarChartMdContainer>
  );
};
function Bar() {
  const [imageUrl, setImageUrl] = useState("");

  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };

  const smHasOverflow = barData.length > 6;
  const mdHasOverflow = barData.length > 12;
  const withImage = !!imageUrl;

  return (
    <>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={toggleImg}
      >
        Toggle image
      </Button>
      <SmallCard>
        <BarContainer size="sm" length={barData.length - 1}>
          <ReactECharts option={smOption(barData, smHasOverflow)} />
        </BarContainer>
      </SmallCard>
      <MediumCard imageUrl={imageUrl}>
        <BarContainer size="md" length={barData.length}>
          <ReactECharts
            option={getMdOption(barData, withImage, mdHasOverflow)}
          />
        </BarContainer>
      </MediumCard>
      <LargeCard data={barData} imageUrl={imageUrl}>
        <BarContainer size="lg" length={barData.length}>
          <ReactECharts option={getLgOption(barData, withImage)} />
        </BarContainer>
      </LargeCard>
    </>
  );
}

export default Bar;
