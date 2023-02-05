import { UserState } from "@/features/recoil/tasklist";
import { AccountCircle } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRecoilState } from "recoil";

const UserAvatar = () => {
  const [user] = useRecoilState(UserState);
  if (user.avatar.length > 0) {
    return <Avatar sx={{ width: 36, height: 36 }} src={user.avatar} />;
  } else {
    return user.name.length > 0 ? (
      <Avatar
        sx={{ width: 36, height: 36 }}
        className="bg-white text-theme2 font-bold"
      >
        {(user.name.at(0) ?? "").toUpperCase()}
      </Avatar>
    ) : (
      <AccountCircle />
    );
  }
};

export default UserAvatar;
