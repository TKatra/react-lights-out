import { configureStore } from '@reduxjs/toolkit';
// import { gridReducer } from '../Reducers/gridReducer';
import gridReducer from '../Reducers/gridSlice';
// import { gridReducer } from '../Reducers/gridReducer';
// import { setupReducer } from '../Reducers/setupReducer';
// import { timerReducer } from '../Reducers/timerReducer';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
    // setup: setupReducer,
    // timer: timerReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;