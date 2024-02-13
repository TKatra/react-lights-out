import { configureStore } from '@reduxjs/toolkit';
import gridReducer from '../Reducers/gridSlice';
import setupReducer from '../Reducers/setupSlice';
import timerReducer from '../Reducers/timerSlice';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
    setup: setupReducer,
    timer: timerReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;