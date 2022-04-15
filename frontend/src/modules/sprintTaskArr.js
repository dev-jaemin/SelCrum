import produce from "immer";

export const MATCH_TASK = "sprintTaskArr/MATCH_TASK";
export const API_INIT = "sprintTaskArr/API_INIT";
export const ADD_INIT = "sprintTaskArr/ADD_INIT";
export const REMOVE_TASK = "sprintTaskArr/REMOVE_TASK";

export const matchTask_Sprint = (sprintId, tasks) => ({
  type: MATCH_TASK,
  sprintId,
  tasks,
});

export const setInitSprintTaskArr = (sprints, task_sprint) => ({
  type: API_INIT,
  sprints,
  task_sprint,
});

export const setInitArr = () => ({
  type: ADD_INIT,
});

export const removeTask = (sprintId, taskId) => ({
  type: REMOVE_TASK,
  sprintId,
  taskId,
});

const initialState = {
  3: [1, 2, 3, 4],
  4: [3, 4],
  5: [4],
};

export default function sprintTaskArr(state = initialState, action) {
  switch (action.type) {
    case MATCH_TASK:
      return produce(state, (draft) => {
        action.tasks.forEach((element) => {
          if (draft[action.sprintId] === undefined) {
            //새로 추가하는 sprint일 때
            draft[action.sprintId] = [element];
          } else {
            draft[action.sprintId].push(element);
          }
        });
      });
    case API_INIT:
      console.log("SPRINT_INIT");
      return produce(state, (draft) => {
        console.log(action);
        action.sprints.forEach((s) => {
          const selectedTask = action.task_sprint.filter((t) => t.sprint_id === s.sprint_id);
          draft[s.sprint_id] = selectedTask.map((a) => a.task_id);
        });
      });
    case ADD_INIT:
      return produce(state, (draft) => {
        draft[1] = [];
      });
    case REMOVE_TASK:
      return produce(state, (draft) => {
        draft[action.sprintId] = draft[action.sprintId].filter((element) => element !== action.taskId);
      });
    default:
      return state;
  }
}
