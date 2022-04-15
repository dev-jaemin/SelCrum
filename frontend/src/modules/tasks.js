import produce from "immer";

// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣습니다.
export const INSERT = "tasks/INSERT";
export const MATCH = "tasks/MATCH";
export const SWITCH = "tasks/SWITCH";
export const API_INIT = "tasks/API_INIT";
export const ADD_INIT = "tasks/ADD_INIT";

export const insertTask = (projectId, taskId, text) => ({
  type: INSERT,
  task: {
    id: taskId, // 새 항목을 추가하고 nextId 값에 1을 더해줍니다.
    task: text,
    projectId,
    todo: 1,
  },
});

export const matchTaskWithSprint = (task_id, sprintId) => ({
  type: MATCH,
  task_id,
  sprintId,
});

export const switchTask = (task_id) => ({
  type: SWITCH,
  task_id,
});

export const setInitTaskForAdd = () => ({
  type: ADD_INIT,
});

export const setInitTask = (apiTasks) => ({
  type: API_INIT,
  apiTasks,
});

const initialState = {
  data: [
    {
      task_id: 1,
      project_id: 1,
      task: "task1_redux",
      todo: false,
    },
    {
      task_id: 2,
      project_id: 1,
      task: "task2_redux",
      todo: false,
    },
    {
      task_id: 3,
      project_id: 1,
      sprint_id: 3,
      task: "task3_redux",
      todo: false,
    },
    {
      task_id: 4,
      project_id: 1,
      task: "task4_redux",
      todo: false,
    },
    {
      task_id: 5,
      project_id: 1,
      task: "task5_redux",
      todo: true,
    },
    {
      task_id: 6,
      project_id: 1,
      task: "task6_redux",
      todo: true,
    },
  ],
};

//state를 건드리는 것이 아니라 draft(초안, state가 복사되어 있음)를 수정해야 하는 것이다.
export default function tasks(state = initialState, action) {
  switch (action.type) {
    case INSERT:
      return produce(state, (draft) => {
        draft.data.push(action.task);
      });
    case MATCH:
      return produce(state, (draft) => {
        const selectedTask = draft.data.find((t) => t.task_id === parseInt(action.task_id));

        selectedTask.sprint_id = parseInt(action.sprintId);
      });
    case SWITCH:
      return produce(state, (draft) => {
        const selectedTask = draft.data.find((t) => t.task_id === parseInt(action.task_id));
        if (selectedTask.todo === 1) selectedTask.todo = 0;
        else selectedTask.todo = 1;
      });
    case API_INIT:
      return produce(state, (draft) => {
        draft.data = action.apiTasks;
      });
    case ADD_INIT:
      return produce(state, (draft) => {
        for (let t of draft.data) {
          if (t.sprint_id === 1) {
            t.sprint_id = 0;
          }
        }
      });
    default:
      return state;
  }
}
