import IndexHeader from "@/components/models/Index/IndexHeader";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

export type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
  return (
    <>
      <IndexHeader />
      <Box component="div">
        <main className="mx-auto">{children}</main>
      </Box>
    </>
  );
};

export default LoginLayout;
