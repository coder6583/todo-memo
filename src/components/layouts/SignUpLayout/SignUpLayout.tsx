import IndexHeader from "@/components/models/Index/IndexHeader";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

export type SignUpLayoutProps = {
  children: ReactNode;
};

const SignUpLayout: FC<SignUpLayoutProps> = ({ children }) => {
  return (
    <>
      <IndexHeader />
      <Box component="div">
        <main className="mx-auto">{children}</main>
      </Box>
    </>
  );
};

export default SignUpLayout;
