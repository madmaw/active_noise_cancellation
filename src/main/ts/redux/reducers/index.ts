import { combineReducers } from "redux";
import { CancellerState } from "./cancellerState";
import cancellerStateReducer from "./cancellerStateReducer";

export interface RootState {
    cancellerState: CancellerState
}

export default combineReducers({cancellerState: cancellerStateReducer}); 