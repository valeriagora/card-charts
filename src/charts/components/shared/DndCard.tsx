import { CardContainer } from "./styledComponents";
import styles from "@/app/page.module.css";
import { useMediaQuery, useTheme } from "@mui/material";
import { Breakpoint } from "@/charts/types";
export const DndCard = ({ title, children, size }: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const breakpoint = Breakpoint[matches ? "large" : "medium"];
  return (
    <CardContainer size={size} id="capture" breakpoint={breakpoint}>
      <h3 className={styles.title}>
        Which words would you use to describe the TV promo?
      </h3>
      {children}
    </CardContainer>
  );
};
