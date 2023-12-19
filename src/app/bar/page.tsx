"use client";
import { ReactECharts } from "@/components/ReactECharts";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { LargeCard, MediumCard, DndCard } from "../page";
import { getSmOption, getMdOption, getLgOption } from "@/data/bar";
import { url } from "../pie/page";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import html2canvas from "html2canvas";
type OptionSourceData = [string, string | number, string][];

const images = [
  {
    url: "https://images.unsplash.com/photo-1702744473287-4cc284e97206?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    id: "Exciting 2",
  },
];
const barData: OptionSourceData = [
  ["product", "amount", "url"],
  // ['...', 0],
  // ["Boring dassadsda", 1],
  // [
  //   "Boring dassadsda dssdds Boring dassadsda dssdds Boring dassadsda dssdds",
  //   50,
  // ],
  // ["Exciting", 25],
  // ["Entertaining", 20],
  // ["Intriguing", 15],
  // ["Close-ended", 10],
  // ["Engaging", 5],
  // ["Boring", 5],
  [
    "Exciting 2",
    5,
    "https://images.unsplash.com/photo-1702744473287-4cc284e97206?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  [
    "Entertaining 2",
    10,
    "https://images.unsplash.com/photo-1682687981603-ae874bf432f2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  [
    "Close-ended 2 Boring dassadsda dssdds",
    5,
    "https://images.unsplash.com/photo-1702893576128-21feb60299d1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],

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

const barContainerWidths = {
  sm: 280,
  md: 616,
  lg: 992,
};

const barContainerHeights = {
  sm: 176, // 120
  md: 344,
};

const BarChartContainer = styled("div")<{
  height: number;
  size: "sm" | "md" | "lg";
}>(({ height, size }) => {
  const maxHeight = barContainerHeights[size];
  return {
    width: "100%",
    height: height > maxHeight ? maxHeight : height,
    border: "1px solid pink",
  };
});

const smBarHeight = 16;
const smBarGap = 4;
const mdBarHeight = 16;
const mdBarGap = 12;
const xAxisLabelHeight = 16;

const BarContainer = forwardRef(function Container(
  { length, children, size, withImageOptions },
  ref
) {
  const height =
    size === "sm"
      ? length * 20 + 8 + 40
      : withImageOptions
      ? length * 72 + 16
      : length * 28 + 16;
  // if size is S, max height is 120, M - 344, L - no max height
  return (
    <BarChartContainer size={size} height={height} ref={ref}>
      {children}
    </BarChartContainer>
  );
});
function Bar() {
  const [imageUrl, setImageUrl] = useState("");
  const [size, setSize] = useState("md");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };

  const smHasOverflow = barData.length > 6;
  const mdHasOverflow = barData.length > 12;
  const withImage = !!imageUrl;

  const changeContainerSize = () => {
    setSize("sm");
  };

  const uploadChart = () => {
    html2canvas(document.querySelector("#capture")!).then((canvas) => {
      console.log("canvas", canvas);
      document.body.appendChild(canvas);
    });
  };
  const sm = getSmOption(barData, smHasOverflow);
  const md = getMdOption(barData, withImage, mdHasOverflow);
  const lg = getLgOption(barData, withImage);

  const options = {
    sm,
    md,
    lg,
  };
  return (
    <div
      style={{
        margin: "auto",
        width: 992,
        minHeight: "calc(100vh - 36.5px)",
        border: "2px solid #ddd",
      }}
    >
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={toggleImg}
      >
        Toggle image
      </Button>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={changeContainerSize}
      >
        Change card size
      </Button>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={uploadChart}
      >
        Upload chart
      </Button>

      <DndCard size={size} imageUrl={imageUrl}>
        <BarContainer
          ref={containerRef}
          size={size}
          length={barData.length - 1}
          withImageOptions={!!barData[0][2] && barData[0][2] === "url"}
        >
          <ReactECharts containerRef={containerRef} option={options[size]} />
        </BarContainer>
      </DndCard>
      {/* <MediumCard imageUrl={imageUrl}>
        <BarContainer size="md" length={barData.length}>
          <ReactECharts
            option={getMdOption(barData, withImage, mdHasOverflow)}
          />
        </BarContainer>
      </MediumCard> */}
      {/* <LargeCard data={barData} imageUrl={imageUrl}>
        <BarContainer ref={containerRef} size="lg" length={barData.length}>
          <ReactECharts option={getLgOption(barData, withImage)} />
        </BarContainer>
      </LargeCard> */}
    </div>
  );
}

export default Bar;
