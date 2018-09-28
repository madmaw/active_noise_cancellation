import { createStore, Store, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer, { RootState } from "./reducers/index";

export interface NoiseCancellationStore extends Store<RootState> {
    
}
let store: NoiseCancellationStore = createStore(
    rootReducer, 
    applyMiddleware(thunk)
);

export default store;