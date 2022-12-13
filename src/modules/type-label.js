function getLabel(obj) {
  switch(obj.type) {
    case 'stednavn':
      return obj.skrivemaade
    case 'navngivenvej':
      return obj.vejnavn
    default:
      return obj.adgangsadressebetegnelse
  }
}

export {
  getLabel
}
