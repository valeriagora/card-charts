"use client";
import React from "react";
import { url } from "@/charts/data";
import { CardSize, CustomLegendWithImage } from "@/charts/types";
import BarChartWithOptionImages from "@/charts/components/bar-with-option-images/BarChartWithOptionImages";
import { data, images } from "@/charts/data";

const barData = [
  {
    name: "Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting",
    value: 60,
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
  // {
  //   name: "Boring",
  //   value: 24,
  // },
  // {
  //   name: "Engaging",
  //   value: 1,
  // },
  // {
  //   name: "Boring",
  //   value: 24,
  // },
  // {
  //   name: "Engaging",
  //   value: 1,
  // },
  // {
  //   name: "Boring",
  //   value: 24,
  // },
  // {
  //   name: "Engaging",
  //   value: 100,
  // },
  // {
  //   name: "Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting",
  //   value: 50,
  // },
  // {
  //   name: "Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing IntriguingIntriguingIntriguing",
  //   value: 21,
  // },
];
// const images = [
//   "https://plus.unsplash.com/premium_photo-1697695568731-5b351d7aca4b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1682685797140-c17807f8f217?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1704107116952-978a5712566c?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1704107116952-978a5712566c?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];
const legendData: CustomLegendWithImage = data.map(
  ({ value, name }: { value: number; name: string }, idx: number) => [
    value,
    idx + 1,
    name,
    images[idx],
  ]
);
function Bar() {
  return (
    <div>
      <BarChartWithOptionImages
        data={data}
        legendData={legendData}
        cardSize={CardSize.small}
        questionImage={url}
      />
    </div>
  );
}

export default Bar;
