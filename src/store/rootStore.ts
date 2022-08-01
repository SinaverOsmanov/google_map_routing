import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./rootReducer";
import rootWatcher from "./rootSaga";

const sagaMiddleware = createSagaMiddleware()
const reducers = rootReducer()

export const rootStore = configureStore({
    reducer: reducers,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootWatcher)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch
