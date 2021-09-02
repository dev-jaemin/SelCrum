import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣습니다.
export const INSERT = "task/INSERT";
export const MATCH = "task/MATCH";
export const CONFIRM = "task/CONFIRM";

let nextId = 1;


export const insertTask = (projectId, text) => ({
  type: INSERT,
  task: {
    id: nextId++, // 새 항목을 추가하고 nextId 값에 1을 더해줍니다.
    text,
	projectId,
	sprintId: 0,
	todo:0
  }
});

export const matchTaskWithSprint = (id, sprintId) => ({
	type: MATCH,
	id, sprintId
});

export const confirmTask = (id) => ({
	type: CONFIRM,
	id
});

const initialState = {
	data:[]
};

export default function task(state = initialState, action) {
  switch (action.type) {
    case INSERT:
      return state.concat(action.task);
	case MATCH:
      return produce(state, draft=>{
		  const selectedTask = state.data.find(task => task.id == action.id);
		  selectedTask.sprintId = action.sprintId;
	  });
    case CONFIRM:
      return produce(state, draft=>{
		  const selectedTask = state.data.find(task => task.id == action.id);
		  selectedTask.todo = 1;
	  });
    default:
      return state;
  }
}