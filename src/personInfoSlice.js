import { createSlice } from '@reduxjs/toolkit'

export const personInfo = createSlice({
  name: 'personInfo',
  initialState: [],
  reducers: {
    setInitialState: (_, action) => action.payload,
    addInfo: (state, action) => {
      const newState = [...state, action.payload]
      localStorage.setItem('personInfo', JSON.stringify(newState))
      return newState
    },
    deleteInfo: (state, action) => {
      const newState = state.filter(info => info.id !== action.payload)
      localStorage.setItem('personInfo', JSON.stringify(newState))
      return newState
    },
    updateInfo: (state, action) => {
      const newState = state.map(info => info.id === action.payload.id ? action.payload : info) 
      localStorage.setItem('personInfo', JSON.stringify(newState))
      return newState
    }
  }
})

export const { setInitialState, addInfo, deleteInfo, updateInfo } = personInfo.actions

export default personInfo.reducer