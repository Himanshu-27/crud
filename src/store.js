import { configureStore } from '@reduxjs/toolkit'
import personInfoReducer from './personInfoSlice'

export default configureStore({
  reducer: {
    personInfo: personInfoReducer
  }
})