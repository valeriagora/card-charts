import {
  chartBoxDimensions,
  MIN_L_CHART_HEIGHT,
} from "@/charts/constants/shared";
import { CardSize } from "@/charts/types";
import { styled } from "@mui/material";
const cardWidths = {
  small: 320,
  medium: 656,
  large: 992,
};
const cardHeights = {
  small: 200,
  medium: 416,
  large: "100%",
};

export const CardContainer = styled("div")<{ size: CardSize }>(({ size }) => ({
  padding: "12px 20px 20px 20px",
  width: cardWidths[size],
  height: cardHeights[size],
  background: " #222430",
  borderRadius: 16,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
}));
export const SmToMdChart = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
}));
export const OverflowInfo = styled("div")({
  position: "absolute",
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontWeight: 400,
  fontSize: 12,
  lineHeight: "16px",
  fontFamily: '"Manrope", sans-serif',
  color: "#6C7080",
});
export const ChartContainerStyled = styled("div")<{
  size: CardSize;
  height?: number;
}>(({ size, height }) => {
  const width: number = chartBoxDimensions[size].width;
  return {
    position: "relative",
    width,
    height:
      size === CardSize.large && height
        ? height > MIN_L_CHART_HEIGHT
          ? height
          : MIN_L_CHART_HEIGHT
        : chartBoxDimensions[size].height,
    border: "1px solid slateblue",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  };
});
