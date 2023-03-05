import { MenuComponentProps } from "@/typings/tasklist";
import { MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, SxProps, Theme } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { isContextConsumer } from "react-is";

type HorizMenuProps = {
  MenuComponent: FC<MenuComponentProps>;
  horizSize?: "small" | "medium" | "large" | undefined;
  horizColor?: string;
  menuComponentProps: Omit<MenuComponentProps, "handleClose">;
  iconClassName?: string;
  iconSx?: SxProps<Theme>;
  setMenuOpen?: Dispatch<SetStateAction<boolean>>;
};

const HorizMenu: FC<HorizMenuProps> = ({
  MenuComponent,
  horizSize,
  horizColor,
  menuComponentProps,
  iconClassName,
  iconSx,
  setMenuOpen,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (setMenuOpen) {
      setMenuOpen(true);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <IconButton
        size={horizSize ?? "small"}
        aria-label="settings"
        className={iconClassName ?? "p-1 my-auto"}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: horizColor ?? "#616161",
          ...iconSx,
        }}
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
