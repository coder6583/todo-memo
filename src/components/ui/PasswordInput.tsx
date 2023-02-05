import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { ChangeEventHandler, FC, useState } from "react";

type PasswordInput = {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const PasswordInput: FC<PasswordInput> = ({ onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl variant="standard" required className="w-5/6 mx-auto mb-10">
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordInput;
