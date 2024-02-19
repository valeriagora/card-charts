import { chartOptionsOverflow } from "@/charts/constants/shared";
import { CardSize, Breakpoint } from "@/charts/types";
import Image from "next/image";
import { forwardRef, LegacyRef, ReactNode } from "react";
import { ChartContainerStyled, OverflowInfo } from "./styledComponents";

interface IChartContainerProps {
  size: CardSize;
  height?: number;
  hasOverflow: boolean;
  optionsCount: number;
  withOptionImages?: boolean;
  children: ReactNode;
  breakpoint: Breakpoint;
}
export const ChartContainer = forwardRef(function Container(
  {
    size,
    height,
    hasOverflow,
    optionsCount,
    children,
    withOptionImages = false,
    breakpoint,
  }: IChartContainerProps,
  ref
) {
  return (
    <ChartContainerStyled
      size={size}
      height={height}
      ref={ref as LegacyRef<HTMLDivElement>}
      breakpoint={breakpoint}
    >
      {children}
      {hasOverflow && (
        <OverflowInfo>
          {size !== CardSize.large &&
            chartOptionsOverflow[size as CardSize.small | CardSize.medium][
              withOptionImages ? "withImgOptions" : "default"
            ]}
          / {optionsCount} options{" "}
          <Image width={16} height={16} src={"/info.svg"} alt="info" />
        </OverflowInfo>
      )}
    </ChartContainerStyled>
  );
});
