import { configureStore } from '@reduxjs/toolkit'
import selectLabelModalReducer from './slice/selectLabelModalSlice'
import geomanLayerReducer from './slice/geomanLayerSlice'
import contextmenuReducer from './slice/contextmenuSlice'

export const store = configureStore({
  reducer: {
    selectLabelModal: selectLabelModalReducer,
    geomanLayer: geomanLayerReducer,
    contextmenu: contextmenuReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})