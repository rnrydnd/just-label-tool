import L from 'leaflet'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

// Change rectangle to polygon
export const rectangle2polygon = (map, rectangleLayer) => {
  const polygon = L.polygon(rectangleLayer.getLatLngs(), rectangleLayer.options)

  // tooltip copy
  polygon._leaflet_id = rectangleLayer._leaflet_id
  polygon._tooltip = rectangleLayer._tooltip
  polygon._tooltip._leaflet_id = rectangleLayer._leaflet_id

  map.removeLayer(rectangleLayer)
  map.addLayer(polygon)
}

// Change polygon to rectangle
export const polygon2rectangle = (map, polygonLayer) => {
  const rectangle = L.rectangle(polygonLayer.getBounds(), polygonLayer.options)

  // tooltip copy
  rectangle._leaflet_id = polygonLayer._leaflet_id
  rectangle._tooltip = polygonLayer._tooltip
  rectangle._tooltip._leaflet_id = polygonLayer._leaflet_id

  map.removeLayer(polygonLayer)  
  map.addLayer(rectangle)
}

// Are layers(polygon/rectangle) includes point
export const layerSelectByPoint = (layerList, pointLatlng) => {
  const selectedLayerList = layerList.filter(layer => {
    return booleanPointInPolygon([pointLatlng.lng, pointLatlng.lat], layer.toGeoJSON())
  })
  return selectedLayerList
}