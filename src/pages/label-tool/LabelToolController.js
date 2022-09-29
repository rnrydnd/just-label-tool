import L from 'leaflet'
import { useMap } from "react-leaflet";
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  
import { useEffect } from 'react';
import { layerSelectByPoint } from './LabelToolUtil'
import { useDispatch, useSelector } from 'react-redux';
import { selectLabelModalToggle } from '../../redux-toolkit/slice/selectLabelModalSlice'
import { layerSelect, addLayer, removeLayer } from '../../redux-toolkit/slice/geomanLayerSlice'
import { rectangleClickMode, polygonClickMode, impossibleConvertMode } from '../../redux-toolkit/slice/contextmenuSlice'



function LabelToolController({labelList, setLabelList}) {
  const dispatch = useDispatch()
  const map = useMap()
  const layerGroup = L.layerGroup()
  const {layerList} = useSelector(state => state.geomanLayer)

  // Map 관련 Global Option
  map.pm.setPathOptions({
    color: 'orange',
    fillColor: 'orange',
    fillOpacity: 0.3,
    weight: 2
  })
  map.pm.setGlobalOptions({layerGroup})
  layerGroup.addTo(map)


  useEffect(() => {

    // contextmenu open event
    map.on('contextmenu', event => {
      // select layer by point
      const selectedLayers = layerSelectByPoint(layerGroup.getLayers(), event.latlng)
      // shape convert context menu build
      if(selectedLayers.length === 1) {
        const shape = selectedLayers[0].pm.getShape()
        console.log('selectedLayers : ', selectedLayers)
        if(shape === 'Rectangle') {
          dispatch(rectangleClickMode({map: map, rectangleLayer: selectedLayers[0]}))
        } else if(shape === 'Polygon') {
          dispatch(polygonClickMode({map: map, polygonLayer: selectedLayers[0]}))
        }
      } else {
        // selected multiple layers, show can't convert shape message
        dispatch(impossibleConvertMode({map: map}))
      }    
    })

    // label create event
    map.on('pm:create', event => {
      setLabelList([...labelList, event.shape])
      // labelFeatureGroup.addLayer(event.layer)

      dispatch(addLayer(event.layer))
      dispatch(layerSelect(event.layer))
      dispatch(selectLabelModalToggle(true))
    })
  
    // label remove event
    map.on('pm:remove', event => {
      // labelFeatureGroup.removeLayer(event.layer)
      dispatch(removeLayer(event.layer))
    })


    
  

    
    map.pm.addControls({  
      position: 'topleft',
    })
  }, [])
  
  

  return <>

  </>
}

export default LabelToolController