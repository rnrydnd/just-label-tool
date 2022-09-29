import React, { useEffect, useRef, useCallback, useState } from 'react'
import {Modal, Radio, Space} from 'antd'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { selectLabelModalToggle, setSelectedRadioData } from '../../../redux-toolkit/slice/selectLabelModalSlice'
import { addLayer, addTooltip, clearLayerList } from '../../../redux-toolkit/slice/geomanLayerSlice'



function LabelSelectModal() {
  // const [radioValue, setRadioValue] = useState(RADIO_DATA[0].value)
  const dispatch = useDispatch()
  const {isModalOpen, selectedRadioData, RADIO_DATA} = useSelector((state) => state.selectLabelModal)
  const {layer} = useSelector((state) => state.geomanLayer)
  const radioRef = useRef()
  

  useEffect(() => {
    if(isModalOpen) {
      window.addEventListener('keydown', keyDownEvent)
    } else {
      window.removeEventListener('keydown', keyDownEvent)
    }
  }, [isModalOpen])

  const keyDownEvent = useCallback((event) => {
    console.log('keydown', event)
    const key = event.key
    if(parseInt(key)) {
      dispatch(setSelectedRadioData(parseInt(key)))
    }
    if(key === 'Enter') {
      setLabelTooltip()
    }
  }, [layer])

  const onChange = event => {
    dispatch(setSelectedRadioData(event.target.value))
  }

  const setLabelTooltip = () => {
    dispatch(addTooltip({layer: layer, tootipText: selectedRadioData.name}))
    dispatch(selectLabelModalToggle(false))
  }

  return (
    <Modal
      title='Select Label' 
      open={isModalOpen} 
      onCancel={() => dispatch(selectLabelModalToggle(false))}
      onOk={() => setLabelTooltip()}
      destroyOnClose={true}
      okText={'OK(Enter로 입력하는것은 수정중 click은 정상)'}
    >
      <Radio.Group onChange={onChange} value={selectedRadioData.value} ref={radioRef}>
        <Space direction="vertical">
          {RADIO_DATA.map((item, idx) => <Radio key={idx} value={item.value}>{item.name}(shortcut:{item.value})</Radio>)}
        </Space>
      </Radio.Group>
    </Modal>
  )
}

export default LabelSelectModal