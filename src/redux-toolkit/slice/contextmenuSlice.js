import {createSlice} from '@reduxjs/toolkit'
import { rectangle2polygon, polygon2rectangle } from '../../pages/label-tool/LabelToolUtil'

const initialState = {
  contextmenuItems: []
}

export const contextmenuSlice = createSlice({
  name: 'contextmenu',
  initialState,
  reducers: {
    rectangleClickMode: (state, action) => {
      const {map, rectangleLayer} = action.payload
      map.contextmenu.removeAllItems();
      map.contextmenu.addItem(
        {
          text: 'Convert Rect to Poly', 
          callback: () => {rectangle2polygon(map, rectangleLayer)}
        }
      )
    },
    polygonClickMode: (state, action) => {
      const {map, polygonLayer} = action.payload
      map.contextmenu.removeAllItems();
      map.contextmenu.addItem(
        {
          text: 'Convert Poly to Rect', 
          callback: () => {polygon2rectangle(map, polygonLayer)}
        }
      )
    },
    impossibleConvertMode: (state, action) => {
      const {map} = action.payload
      map.contextmenu.removeAllItems();
      map.contextmenu.addItem(
        {
          text: 'empty menu'
        }
      )
    }
  }
})

export const { rectangleClickMode, polygonClickMode, impossibleConvertMode } = contextmenuSlice.actions
export default contextmenuSlice.reducer