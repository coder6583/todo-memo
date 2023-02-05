import { UserType } from "@/typings/tasklist";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

const checkUserType = (data: any): data is UserType => {
  return (
    typeof data.name === "string" &&
    typeof data.avatar === "string" &&
    typeof data.email === "string" &&
    typeof data.uid === "string" &&
    typeof data.workspaces === "object"
  );
};

const userConverter = {
  toFirestore(user: UserType): DocumentData {
    return {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      uid: user.uid,
      workspaces: user.workspaces,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserType {
    const data = snapshot.data(options);
    if (!checkUserType(data)) {
      console.error(data);
      throw new Error("invalid user");
    }

    return {
      name: data.name,
      avatar: data.avatar,
      email: data.email,
      uid: data.uid,
      workspaces: data.workspaces,
    };
  },
};

export { checkUserType, userConverter };
