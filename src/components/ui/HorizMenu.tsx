import { MenuComponentProps } from "@/typings/tasklist";
import { MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";
import { FC, useState } from "react";

type HorizMenuProps = {
  MenuComponent: FC<MenuComponentProps>;
  horizSize?: "small" | "medium" | "large" | undefined;
  horizColor?: string;
  menuComponentProps: Omit<MenuComponentProps, "handleClose">;
};

const HorizMenu: FC<HorizMenuProps> = ({
  MenuComponent,
  horizSize,
  horizColor,
  menuComponentProps,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size={horizSize ?? "small"}
        aria-label="settings"
        className="p-1 my-auto"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: horizColor ?? "#616161" }}
      >
        <MoreHoriz />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuComponent handleClose={handleClose} {...menuComponentProps} />
      </Menu>
    </>
  );
};

export default HorizMenu;
