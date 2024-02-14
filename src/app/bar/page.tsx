"use client";
import React from "react";
import { CardSize, CustomLegend } from "@/charts/types";
import BarChart from "@/charts/components/bar/BarChart";
import { url } from "@/charts/data";
import { data } from "@/charts/data";

const legendData: CustomLegend = data.map(
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
        data={data}
        legendData={legendData}
        cardSize={CardSize.small}
        questionImage={url}
      />
    </div>
  );
}

export default Bar;
