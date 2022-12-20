function getGeometry(obj) {
  return obj.geometri || obj.adgangspunkt_geometri || obj.vejpunkt_geometri
}

/**
 * Returns more alike objects from gsearch response
 * @param {object} obj 
 * @returns 
 */
function normalize(obj) {
  const new_obj = obj
  new_obj.label = obj.visningstekst
  new_obj.geometry = getGeometry(obj)
  return new_obj
}

export {
  normalize
}
