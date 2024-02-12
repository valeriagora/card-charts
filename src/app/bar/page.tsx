"use client";
import React from "react";
import { CardSize, CustomLegend } from "@/charts/types";
import BarChart from "@/charts/components/bar/BarChart";
import { url } from "@/charts/constants/shared";

const barData = [
  {
    name: "Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting",
    value: 50,
  },
  {
    name: "Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing IntriguingIntriguingIntriguing",
    value: 20,
  },
  {
    name: "Close-ended",
    value: 55,
  },
  {
    name: "Boring",
    value: 24,
  },
  {
    name: "Engaging",
    value: 1,
  },
  {
    name: "Boring",
    value: 24,
  },
  {
    name: "Engaging",
    value: 1,
  },
  {
    name: "Boring",
    value: 24,
  },
  {
    name: "Engaging",
    value: 1,
  },
  {
    name: "Boring",
    value: 24,
  },
  {
    name: "Engaging",
    value: 100,
  },
  {
    name: "Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting",
    value: 50,
  },
  {
    name: "Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing IntriguingIntriguingIntriguing",
    value: 21,
  },
];

const legendData: CustomLegend[] = barData.map(
  ({ value, name }: { value: number; name: string }, idx: number) => [
    value,
    idx + 1,
    name,
  ]
);
function Bar() {
  return (
    <div>
      <BarChart
        data={barData}
        legendData={legendData}
        cardSize={CardSize.small}
        questionImage={url}
      />
    </div>
  );
}

export default Bar;
