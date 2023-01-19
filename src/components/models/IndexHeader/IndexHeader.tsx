import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FC } from "react";

const IndexHeader: FC = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="bg-blue-400">
          <Toolbar className="w-10/12 mx-auto">
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
