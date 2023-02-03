import IndexHeader from "@/components/models/IndexHeader/IndexHeader";
import IndexSider from "@/components/models/IndexSider/IndexSider";
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
        <IndexSider />
        <main className="w-4/5 mt-2">{children}</main>
      </Box>
    </>
  );
};

export default IndexLayout;
