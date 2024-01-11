"use client";
import React from "react";

import { CardSize } from "../bar/types";
import PieChart from "./components/PieChart";

function Pie() {
  return <PieChart cardSize={CardSize.medium} />;
}

export default Pie;
