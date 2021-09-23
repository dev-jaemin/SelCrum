import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣습니다.
export const INSERT = "task/INSERT";
export const MATCH = "task/MATCH";
export const CONFIRM = "task/CONFIRM";
export const API_INIT = "task/API_INIT";

let nextId = 1;

export const insertTask = (projectId, text) => ({
  type: INSERT,
  task: {
    id: nextId++, // 새 항목을 추가하고 nextId 값에 1을 더해줍니다.
    text,
    projectId,
    sprintId: 0,
    todo: 0,
  },
});

export const matchTaskWithSprint = (id, sprintId) => ({
  type: MATCH,
  id,
  sprintId,
});

export const confirmTask = (id) => ({
  type: CONFIRM,
  id,
});

export const setInitTask = (apiTasks) => ({
  type: API_INIT,
  apiTasks,
});

const initialState = {
  data: [
    {
      id: 1,
      projectId: 1,
      sprintId: 1,
      task: "task1_redux",
      todo: 1,
    },
    {
      id: 2,
      projectId: 1,
      sprintId: 1,
      task: "task2_redux",
      todo: 1,
    },
    {
      id: 3,
      projectId: 1,
      sprintId: 2,
      task: "task3_redux",
      todo: 2,
    },
    {
      id: 4,
      projectId: 1,
      sprintId: 3,
      task: "task4_redux",
      todo: 1,
    },
    {
      id: 5,
      projectId: 1,
      sprintId: 4,
      task: "task5_redux",
      todo: 3,
    },
    {
      id: 6,
      projectId: 1,
      sprintId: 5,
      task: "task6_redux",
      todo: 3,
    },
  ],
};

//state를 건드리는 것이 아니라 draft(초안, state가 복사되어 있음)를 수정해야 하는 것이다.
export default function task(state = initialState, action) {
  switch (action.type) {
    case INSERT:
      return produce(state, (draft) => {
        draft.concat(action.task);
      });
    case MATCH:
      return produce(state, (draft) => {
        const selectedTask = draft.data.find((t) => t.id == action.id);

        selectedTask.sprintId = parseInt(action.sprintId);
      });
    case CONFIRM:
      return produce(state, (draft) => {
        const selectedTask = draft.data.find((task) => task.id == action.id);
        selectedTask.todo = 1;
      });
    case API_INIT:
      return produce(state, (draft) => {
        draft.data = action.apiTasks;
      });
    default:
      return state;
  }
}
