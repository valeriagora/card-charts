"use client";
import React from "react";

import { CardSize } from "@/types";
import PieChart from "./components/PieChart";

function Pie() {
  return <PieChart cardSize={CardSize.small} />;
}

export default Pie;
