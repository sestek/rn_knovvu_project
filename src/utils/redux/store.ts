import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './slice/themeSlice';
import webchatSlice from './slice/webchatSlice';

export const store = configureStore({
    reducer: {
        webchat: webchatSlice,
        theme: themeSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch