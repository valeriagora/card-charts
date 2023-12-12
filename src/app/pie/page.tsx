"use client";
import { ReactECharts } from "@/components/ReactECharts";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { SmallCard, MediumCard, LargeCard } from "../page";
import { smOption, getMdOption, getLgOption } from "@/data/pie";
const pieData = [
  {
    value: 10,
    name: "Search Engine Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine",
  },
  {
    value: 20,
    name: "Search Engine",
  },
  { value: 25, name: "Other" },
  { value: 15, name: "Option 1" },
  { value: 2, name: "Option 2" },
  { value: 3, name: "Option 3" },
  { value: 5, name: "Option 4" },
  { value: 3, name: "Option 5 Engine Search Engine Search Engine Search" },
  { value: 2, name: "Option 6" },
  { value: 2, name: "Option 7" },
  { value: 2, name: "Option 8" },
  { value: 2, name: "Option 9" },
  { value: 2, name: "Option 10" },
  { value: 2, name: "Option 11" },
  { value: 8, name: "Option 12" },
  { value: 2, name: "Option 13" },
];
export const url =
  "https://images.unsplash.com/photo-1702068213563-2d29f10639ec?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
function Pie() {
  const [imageUrl, setImageUrl] = useState("");

  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };

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
        <ReactECharts option={smOption(pieData)} />
      </SmallCard>
      <MediumCard imageUrl={imageUrl}>
        <ReactECharts option={getMdOption(pieData, withImage)} />
      </MediumCard>
      <LargeCard data={pieData} imageUrl={imageUrl}>
        <ReactECharts option={getLgOption(pieData, withImage)} />
      </LargeCard>
    </>
  );
}

export default Pie;
