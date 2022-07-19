import todoReducer from "./todoSlice";
import authReducer from "./authSlice";

const rootReducers = {
  todo: todoReducer,
  auth: authReducer,
};

export default rootReducers;
