import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/counter/counter.slice'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
