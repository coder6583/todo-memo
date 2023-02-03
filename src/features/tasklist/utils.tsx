import { TaskStateType, TaskType } from "@/typings/tasklist";
import {
  CheckCircle,
  PanoramaFishEye,
  RemoveCircle,
  TripOriginRounded,
} from "@mui/icons-material";

const insertTask = (
  list: TaskType[],
  newTask: TaskType,
  index: number
): TaskType[] => {
  if (index < 0 || index > list.length) {
    console.error(`${index} cannot be accessed in list.`);
    return list;
  }
  return [...list.slice(0, index), newTask, ...list.slice(index)];
};

const checkStateType = (state: string): state is TaskStateType =>
  state == "todo" || state == "ondeck" || state == "done";

const updateState = (state: TaskStateType): TaskStateType => {
  if (state == "todo") {
    return "ondeck";
  } else if (state == "ondeck") {
    return "done";
  } else if (state == "done") {
    return "done";
  } else {
    return "todo";
  }
};

const stateColor = (taskstate: TaskStateType) => {
  if (taskstate == "todo") return "#ce2d32";
  if (taskstate == "ondeck") return "#dede2d";
  if (taskstate == "done") return "#2d7e32";
  return "#ce2d32";
};

const stateIcon = (taskstate: TaskStateType) => {
  if (taskstate == "todo")
    return (
      <TripOriginRounded
        sx={{ color: stateColor(taskstate), borderColor: "#6b6b6b" }}
      />
    );
  if (taskstate == "ondeck")
    return (
      <RemoveCircle
        sx={{ color: stateColor(taskstate), borderColor: "#6b6b6b" }}
      />
    );
  if (taskstate == "done")
    return (
      <CheckCircle
        sx={{ color: stateColor(taskstate), borderColor: "#6b6b6b" }}
      />
    );
  return (
    <PanoramaFishEye
      sx={{ color: stateColor(taskstate), borderColor: "#6b6b6b" }}
    />
  );
};

export { insertTask, checkStateType, updateState, stateColor, stateIcon };
