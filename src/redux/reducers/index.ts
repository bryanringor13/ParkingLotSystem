import { combineReducers } from 'redux';
import parkingReducer from './parking';

const rootReducer = combineReducers({
    parking: parkingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;