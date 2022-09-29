import {createSlice} from '@reduxjs/toolkit'
import L from 'leaflet'

const initialState = {
  layerList: L.layerGroup(),
  layer: undefined
}

export const geomanLayerSlice = createSlice({
  name: 'geomanLayer',
  initialState,
  reducers: {
    addLayer: (state, action) => {
      state.layerList.addLayer(action.payload)
    },
    removeLayer: (state, action) => {
      state.layerList.removeLayer(action.payload)
    },
    addTooltip: (state, action) => {
      const {layer, tootipText} = action.payload
      // const selectedLayer = state.layerList.getLayer(layer._leaflet_id)
      layer.bindTooltip(tootipText, {direction: 'bottom', permanent: true})
    },
    clearLayerList: state => {
      state.layerList.clearLayers()
    },
    layerSelect: (state, action) => {
      state.layer = action.payload
    },
    setLayerList: (state, action) => {
      state.layerList = action.payload
    }
  }
})

export const { addLayer, removeLayer, addTooltip, clearLayerList, layerSelect, setLayerList } = geomanLayerSlice.actions
export default geomanLayerSlice.reducer