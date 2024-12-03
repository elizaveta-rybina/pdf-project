import { configureStore } from '@reduxjs/toolkit'
import ilovepdfReducer from './IlovepdfApiSlice'

const store = configureStore({
	reducer: {
		ilovepdf: ilovepdfReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
