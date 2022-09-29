import { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useState } from 'react'
import { MapContainer, SVGOverlay, ImageOverlay } from "react-leaflet"
import LabelController from './LabelToolController';
import '@inelo/leaflet-contextmenu'
import '@inelo/leaflet-contextmenu/dist/leaflet.contextmenu.css'
import sampleImage from '../../assets/image/IMG_3557.png'
import LabelSelectModal from './modal/LabelSelectModal';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const LabelTool = () => {
  const [labelList, setLabelList] = useState([]);
  const { contextmenuItems } = useSelector(state => state.contextmenu)

  useEffect(() => {
    console.log(' contextmenuItems useEffect : ', contextmenuItems)
  }, [contextmenuItems])

  return <>  
    <MapContainer 
      center={[1000, 1000]} 
      zoom={-1}
      minZoom={-3}
      style={{height:700}}
      crs={CRS.Simple}
      contextmenu={true}
      contextmenuItems={contextmenuItems}
    >
      <ImageOverlay url={sampleImage} bounds={[[0, 0], [2000, 2000]]}>

      </ImageOverlay>
        {/* <SVGOverlay bounds={[[0, 0], [500, 3000]]}>
          <text x="50%" y="50%" dominantBaseline={'middle'} textAnchor={'middle'} fontSize={'2em'} fontWeight={'bold'}>
            이미지 들어올 자리
          </text>
        </SVGOverlay> */}
      <LabelController 
        labelList={labelList}
        setLabelList={setLabelList}
      />
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
    </MapContainer>

    <LabelSelectModal/>

    <div>
      {labelList.map((labelItem, idx) => {
        return <div key={idx}>{labelItem}</div>
      })}
    </div>


  </>
}

export default LabelTool