"use client";
import { ReactECharts } from "@/components/ReactECharts";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { MediumCard } from "../../components/MediumCard";
import { LargeCard } from "../../components/LargeCard";
// import { SmallCard } from "../../components/MediumCard";
import { smOption, getMdOption, getLgOption } from "@/data/pie";
import { url } from "@/data/constants";
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
      {/* <SmallCard> */}
      {/* <ReactECharts option={smOption(pieData)} /> */}
      {/* </SmallCard> */}
      {/* <MediumCard imageUrl={imageUrl}>
        <ReactECharts option={getMdOption(pieData, withImage)} />
      </MediumCard> */}
      {/* <LargeCard data={pieData} imageUrl={imageUrl}>
        <ReactECharts option={getLgOption(pieData, withImage)} />
      </LargeCard> */}
    </>
  );
}

export default Pie;
