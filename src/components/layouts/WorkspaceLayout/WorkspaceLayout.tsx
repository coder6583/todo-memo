import WorkspaceHeader from "@/components/models/Workspace/WorkspaceHeader";
import WorkspaceSider from "@/components/models/Workspace/WorkspaceSider";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

export type WorkspaceLayoutProps = {
  children: ReactNode;
};

const WorkspaceLayout: FC<WorkspaceLayoutProps> = ({ children }) => {
  return (
    <>
      <WorkspaceHeader />
      <Box component="div" className="flex">
        <WorkspaceSider />
        <main className="w-4/5 mt-2">{children}</main>
      </Box>
    </>
  );
};

export default WorkspaceLayout;
