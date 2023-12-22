"use client";
import { ReactECharts } from "@/components/ReactECharts";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { LargeCard, MediumCard, DndCard } from "../page";
import { getSmOption, getMdOption, getLgOption } from "@/data/bar";
import { url } from "../pie/page";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import html2canvas from "html2canvas";

const barContainerWidths = {
  sm: 280,
  md: 616,
  lg: 992,
};

const barContainerHeights = {
  sm: 176, // 120
  md: 344,
};
const OverflowInfo = styled("div")({
  position: "absolute",
  bottom: 0,
  right: "calc(50% - 155px)",
  height: 24,
  border: "1px solid #ddd",
  fontSize: 12,
  fontFamily: '"Manrope", sans-serif',
  color: "#6c7080",
});
const barData = {
  // common
  labels: {
    exciting: "Exciting",
    intriguing: "Intriguing",
    closeEnded: "Close-ended",
    boring: "Boring",
    engaging: "Engaging Engaging Engaging Engaging Engaging",
  },
  images: {
    exciting:
      "https://images.unsplash.com/photo-1702306258947-162c0847db0c?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    engaging:
      "https://images.unsplash.com/photo-1702744473287-4cc284e97206?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    intriguing:
      "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    closeEnded:
      "https://images.unsplash.com/photo-1702893576128-21feb60299d1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    boring:
      "https://images.unsplash.com/photo-1703028408829-ba45aa14b782?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  values: [50, 20, 5, 24, 1],
};
const BarChartContainer = styled("div")<{
  height: number;
  size: "sm" | "md" | "lg";
}>(({ height, size }) => {
  const maxHeight = barContainerHeights[size];
  return {
    position: "relative",
    width: "100%",
    height: maxHeight,
    // height: height > maxHeight ? maxHeight : height,
    border: "1px solid pink",
  };
});

const smBarHeight = 16;
const smBarGap = 4;
const mdBarHeight = 16;
const mdBarGap = 12;
const xAxisLabelHeight = 16;

interface IBarOptionsOverflow {
  sm: {
    simple: number;
    withImgOptions: number;
  };
  md: {
    simple: number;
    withImgOptions: number;
  };
}
const barOptionsOverflow: IBarOptionsOverflow = {
  sm: { simple: 5, withImgOptions: 5 },
  md: {
    simple: 11,
    withImgOptions: 4,
  },
};

const BarContainer = forwardRef(function Container(
  {
    length,
    children,
    size,
    withImageOptions,
    hasOverflow,
  }: { size: "sm" | "md" | "lg" },
  ref
) {
  const height =
    size === "sm"
      ? (length - 1) * 20 + 8 + 40
      : withImageOptions
      ? (length - 1) * 72 + 16
      : (length - 1) * 28 + 16;
  // if size is S, max height is 120, M - 344, L - no max height
  return (
    <BarChartContainer size={size} height={height} ref={ref}>
      {children}
      {/* {hasOverflow && (
        <OverflowInfo>
          {withImageOptions && size !== "lg"
            ? barOptionsOverflow[size].withImgOptions
            : barOptionsOverflow[size as "sm" | "md"].simple}{" "}
          items of {length}
        </OverflowInfo>
      )} */}
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

  const withImage = !!imageUrl;
  // const withImageOptions = barData.some((elem) => !!elem[2]);
  const withImageOptions = Object.values(barData.images).length;
  const smHasOverflow = barData.values.length > 6;
  const mdHasOverflow = withImageOptions
    ? barData.values.length > 4
    : barData.values.length > 11;

  const changeContainerSize = () => {
    setSize("sm");
  };

  const uploadChart = () => {
    html2canvas(document.querySelector("#capture")!, {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      console.log("canvas", canvas);
      document.body.appendChild(canvas);
    });
  };
  const sm = getSmOption(barData, smHasOverflow);
  const md = getMdOption(
    barData,
    withImage,
    withImageOptions,
    mdHasOverflow,
    barData.images
  );
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
          length={barData.values.length}
          hasOverflow={mdHasOverflow}
          withImageOptions={withImageOptions}
          // withImageOptions={!!barData[0][2] && barData[0][2] === "url"}
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
