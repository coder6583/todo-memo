import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

const IndexHeader: FC = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="bg-theme2 h-min">
          <Toolbar className="ml-16" variant="dense">
            <Typography
              variant="h6"
              component="div"
              className="text-white font-bold text-3xl"
            >
              todomemo
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default IndexHeader;
