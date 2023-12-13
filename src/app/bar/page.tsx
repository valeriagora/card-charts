"use client";
import { ReactECharts } from "@/components/ReactECharts";
import React, { useState } from "react";
import { SmallCard } from "../page";
import { smOption } from "@/data/bar";
import { url } from "../pie/page";

type OptionSourceData = [string, string | number][];
const barData: OptionSourceData = [
  ["product", "amount"],
  // ["...", 0],
  ["Cocoa2", 5],
  ["Yerba Mate", 10],
  ["Cocoa", 15],
  ["Brownie", 20],
  ["Coffee", 25],
  ["Matcha Latte dassadsda dssdds", 50],

  // ["Brownie3", 1], // -
  // ["Brownie4", 20],
  // ["Cocoa24", 5],
  // ["Coffee4", 25],
  // ["Brownie34", 11],
];
function Bar() {
  const [imageUrl, setImageUrl] = useState("");

  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };

  const hasOverflow = barData.length > 6;
  const withImage = !!imageUrl;
  return (
    <>
      {/* <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={toggleImg}
      >
        Toggle image
      </Button> */}
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
          <ReactECharts option={smOption(barData, hasOverflow)} />
        </div>
      </SmallCard>
      {/* <MediumCard imageUrl={imageUrl}>
        <ReactECharts option={getMdOption(pieData, withImage)} />
      </MediumCard>
      <LargeCard data={pieData} imageUrl={imageUrl}>
        <ReactECharts option={getLgOption(pieData, withImage)} />
      </LargeCard> */}
    </>
  );
}

export default Bar;
