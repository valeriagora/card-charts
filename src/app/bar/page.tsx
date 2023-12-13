"use client";
import { ReactECharts } from "@/components/ReactECharts";
import React, { useState } from "react";
import { LargeCard, MediumCard, SmallCard } from "../page";
import { smOption, getMdOption, getLgOption } from "@/data/bar";
import { url } from "../pie/page";
import { Button } from "@mui/material";

type OptionSourceData = [string, string | number][];
const barData: OptionSourceData = [
  ["product", "amount"],
  // ['...', 0],
  ["Close-ended 2 Boring dassadsda dssdds", 5],
  ["Entertaining 2", 10],
  ["Exciting 2", 5],
  ["Boring", 5],

  ["Engaging", 5],
  ["Close-ended", 10],
  ["Intriguing", 15],
  ["Entertaining", 20],
  ["Exciting", 25],
  [
    "Boring dassadsda dssdds Boring dassadsda dssdds Boring dassadsda dssdds",
    50,
  ],
  ["Boring dassadsda", 1],
  ["Boring 3", 3],
];
function Bar() {
  const [imageUrl, setImageUrl] = useState("");

  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };

  const smHasOverflow = barData.length > 6;
  const mdHasOverflow = barData.length > 12;
  const withImage = !!imageUrl;
  console.log("o", mdHasOverflow);
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
        <div
          className="grid"
          style={{
            width: 280,
            height: 120,
            // border: "1px solid pink",
            boxSizing: "border-box",
            // background: "#292A33",
          }}
        >
          <ReactECharts option={smOption(barData, smHasOverflow)} />
        </div>
      </SmallCard>
      <MediumCard imageUrl={imageUrl}>
        <ReactECharts option={getMdOption(barData, withImage, mdHasOverflow)} />
      </MediumCard>
      <LargeCard data={barData} imageUrl={imageUrl}>
        <ReactECharts option={getLgOption(barData, withImage)} />
      </LargeCard>
    </>
  );
}

export default Bar;
