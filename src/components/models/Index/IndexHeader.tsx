import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

const IndexHeader: FC = () => {
  return (
    <>
      <Box>
        <AppBar position="static" className="bg-theme2 h-min" elevation={3}>
          <Toolbar className="ml-8">
            <Box component="div" sx={{ flexGrow: 1 }}>
              <Box component="div" className="flex">
                <Link href="/">
                  <Typography
                    variant="h6"
                    component="div"
                    className="text-white font-bold text-3xl cursor-pointer"
                  >
                    todomemo
                  </Typography>
                </Link>
              </Box>
            </Box>
            <Link href="/login">
              <Button color="inherit" className="mr-2" size="large">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                color="inherit"
                size="medium"
                className="border-2 border-white border-solid pr-4 pl-4 font-bold text-base hover:bg-white hover:text-theme2"
              >
                Sign up
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default IndexHeader;
