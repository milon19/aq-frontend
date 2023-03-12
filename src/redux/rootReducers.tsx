import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import demoReducer from "./slices/demoSlices";
import authReducer from "./slices/authSlices";

const authPersistConfig = {
  key: "auth",
  storage,
};


const rootReducer = combineReducers({
  demo: demoReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export { rootReducer };
