function getLabel(obj) {
  return obj.praesentation || obj.adgangsadressebetegnelse || obj.adressebetegnelse
}

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
  new_obj.label = getLabel(obj)
  new_obj.geometry = getGeometry(obj)
  new_obj.crs = crs
  return new_obj
}

export {
  normalize
}
