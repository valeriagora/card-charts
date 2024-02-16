import {
  CARD_DIMENSIONS,
  CHART_BOX_DIMENSIONS,
  MIN_CHART_HEIGHT_L,
} from "@/charts/constants/shared";
import { CardSize, IBreakpoint } from "@/charts/types";
import { styled } from "@mui/material";

export const CardContainer = styled("div")<{
  size: CardSize;
  breakpoint: IBreakpoint;
}>(({ size, breakpoint }) => ({
  padding: "12px 20px 20px 20px",
  width: CARD_DIMENSIONS[breakpoint][size].width,
  height: CARD_DIMENSIONS[breakpoint][size].height,
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
  breakpoint: IBreakpoint;
}>(({ size, height, breakpoint }) => {
  const width: number = CHART_BOX_DIMENSIONS[breakpoint][size].width;
  return {
    position: "relative",
    width,
    height:
      size === CardSize.large && height
        ? height > MIN_CHART_HEIGHT_L
          ? height
          : MIN_CHART_HEIGHT_L
        : CHART_BOX_DIMENSIONS[breakpoint][size].height,
    border: "1px solid slateblue",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  };
});
