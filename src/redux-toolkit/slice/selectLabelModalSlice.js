import {createSlice} from '@reduxjs/toolkit'
import _ from 'lodash'

const RADIO_DATA = [
  { value: 1, name: '박스' },
  { value: 2, name: '키보드' },
  { value: 3, name: '마우스' },
];

const initialState = {
  isModalOpen: false,
  selectedRadioData: RADIO_DATA[0],
  RADIO_DATA: RADIO_DATA
}

export const selectLabelModalSlice = createSlice({
  name: 'selectLabelModal',
  initialState,
  reducers: {
    selectLabelModalToggle: (state, action) => {
      state.isModalOpen = action.payload
    },
    setSelectedRadioData: (state, action) => {
      const radioValue = action.payload
      const findData = _.find(RADIO_DATA, {value: radioValue})
      if(findData) {
        state.selectedRadioData = findData
      }
    },
  }
})

export const { selectLabelModalToggle, setSelectedRadioData } = selectLabelModalSlice.actions
export default selectLabelModalSlice.reducer