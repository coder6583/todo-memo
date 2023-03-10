import IndexHeader from "@/components/models/Index/IndexHeader";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

export type IndexLayoutProps = {
  children: ReactNode;
};

const IndexLayout: FC<IndexLayoutProps> = ({ children }) => {
  return (
    <>
      <IndexHeader />
      <Box component="div" className="flex">
        <main>{children}</main>
      </Box>
    </>
  );
};

export default IndexLayout;
