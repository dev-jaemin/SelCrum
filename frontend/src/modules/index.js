/** root reducer */
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import tasks from "./tasks";
import sprintTaskArr from "./sprintTaskArr";

//새로고침하면 redux데이터 사라지는거 방지하기위해 localstorage/sessionstorage에 저장
const persistConfig = {
  key: "root",
  // sessionStorage에 저장
  storage: storageSession,
  whitelist: ["tasks", "sprintTaskArr"],
  // blacklist -> 그것만 제외
};

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드
// store에 저장되는 리듀서는 오직 1개
const rootReducer = combineReducers({
  tasks,
  sprintTaskArr,
});

export default persistReducer(persistConfig, rootReducer);
