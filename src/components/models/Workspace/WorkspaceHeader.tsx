import UserAvatar from "@/components/ui/UserAvatar";
import db, { auth } from "@/features/firebase/firebase";
import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const WorkspaceHeader: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName ?? "",
    email: auth.currentUser?.email ?? "",
  });
  const { name, email } = formData;
  useEffect(() => {
    if (name == "") {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="bg-theme2 h-min" elevation={3}>
          <Toolbar className="ml-16" variant="dense">
            <Typography
              variant="h6"
              component="div"
              className="text-white font-bold text-2xl"
              sx={{ flexGrow: 1 }}
            >
              todomemo
            </Typography>
            <Box>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                className="mr-2 "
              >
                <UserAvatar />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    auth.signOut();
                    router.push("/");
                    handleClose();
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default WorkspaceHeader;
