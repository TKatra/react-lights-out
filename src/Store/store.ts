import { configureStore } from '@reduxjs/toolkit';
import gridReducer from '../Slices/gridSlice';
import setupReducer from '../Slices/setupSlice';
import timerReducer from '../Slices/timerSlice';

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