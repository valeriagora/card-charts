"use client";
import React from "react";
import { url } from "@/charts/data";
import { CardSize, CustomLegendWithImage } from "@/charts/types";
import BarChartWithOptionImages from "@/charts/components/bar-with-option-images/BarChartWithOptionImages";
import { data, images } from "@/charts/data";

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
