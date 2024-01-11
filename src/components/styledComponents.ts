import { CardSize } from "@/app/bar/types";
import { styled } from "@mui/material";
const cardWidths = {
  small: 320,
  medium: 656,
  large: "100%",
};
const cardHeights = {
  small: 200,
  medium: 416,
  large: "100%",
};

export const CardContainer = styled("div")<{ size: CardSize }>(({ size }) => ({
  padding: "12px 20px",
  width: cardWidths[size],
  height: cardHeights[size],
  background: " #222430",
  borderRadius: 16,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
  border: "1px solid crimson",
}));
export const SmToMdChart = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  border: "1px solid slateblue",
}));
