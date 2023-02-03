import { Box, Input, Typography } from "@mui/material";
import { FC, FocusEventHandler, ReactNode, useState } from "react";

type EditableTypographyProps = {
  defaultValue: string;
  onBlur: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  textColor?: string;
  underlineColor?: string;
  focusedUnderlineColor?: string;
  typographyVariant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | undefined;
  inputTextSize?: string;
  inputLineHeight?: string;
};

const EditableTypography: FC<EditableTypographyProps> = ({
  defaultValue,
  onBlur,
  textColor,
  underlineColor,
  focusedUnderlineColor,
  typographyVariant,
  inputTextSize,
  inputLineHeight,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const nameComponent = (): ReactNode => {
    if (edit) {
      return (
        <Input
          defaultValue={defaultValue}
          sx={{
            ":before": { borderBottomColor: underlineColor ?? "white" },
            ":after": { borderBottomColor: focusedUnderlineColor ?? "#1b998b" },
            color: textColor ?? "white",
            fontSize: inputTextSize ?? "1.125rem",
            lineHeight: inputLineHeight ?? "1.125rem",
          }}
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          onBlur={onBlur}
        />
      );
    } else {
      return (
        <Typography variant={typographyVariant ?? "h6"}>
          {defaultValue}
        </Typography>
      );
    }
  };
  const handleNameChange = () => {
    setEdit(true);
  };
  const handleEscapeNameChange = () => {
    setEdit(false);
  };

  return (
    <Box
      component="div"
      className="pb-1"
      onDoubleClick={handleNameChange}
      onBlur={handleEscapeNameChange}
      sx={{ color: textColor ?? "white" }}
    >
      {nameComponent()}
    </Box>
  );
};

export default EditableTypography;
