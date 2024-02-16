import {
  CardContainer,
  cardDimensions,
  cardDimensionsLgBreakpoint,
  SmToMdChart,
} from "./styledComponents";
import styles from "@/app/page.module.css";
import { useMediaQuery, useTheme } from "@mui/material";
import { IBreakpoint } from "@/charts/types";
export const DndCard = ({ title, children, size }: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const breakpoint = IBreakpoint[matches ? "large" : "medium"];
  // const cardDims = matches ? cardDimensionsLgBreakpoint : cardDimensions;
  return (
    <CardContainer size={size} id="capture" breakpoint={breakpoint}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      <SmToMdChart>{children}</SmToMdChart>
    </CardContainer>
  );
};
