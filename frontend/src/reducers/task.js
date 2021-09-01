import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// reducer가 많아지면 action상수가 중복될 수 있으니
// 액션이름 앞에 파일 이름을 넣습니다.
export const INSERT = "task/INSERT";
export const MATCH = "task/MATCH";

let id = 0;


export const insert = createAction(INSERT, (text, projectId, sprintId) => ({
  text,
  id: id++,
	projectId,
	sprintId
}));

export const match = createAction(MATCH, (sprintId) => ({
	sprintId : sprintId
}));

const initialState = {
	data:[]
};

//state: 현재 상태, draft:바뀔 상태
export default handleActions(
	{
    	[INSERT]: (state, {payload:{ id, text, sprintId, projectId}}) => {
			const item = {
				id,
				text,
				sprintId,
				projectId,
				todo: 0
			};
		
			return produce(state, draft => {
				draft.data.push(item);
			})
		},
		[MATCH]: (state, {payload:{ id, sprintId}}) => {
			const index = state.data.findIndex(item => item.id === id);
		
			return produce(state, draft => {
				draft.data[index].sprintId = sprintId;
			})
		}

	},
	initialState
);