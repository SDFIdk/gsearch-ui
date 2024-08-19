import closeIcon from '@dataforsyningen/designsystem/assets/icons/close.svg'
import mapVejIcon from '@dataforsyningen/designsystem/assets/icons/road.svg'
import mapAdresseIcon from '@dataforsyningen/designsystem/assets/icons/pointer-address.svg'
import mapStedIcon from '@dataforsyningen/designsystem/assets/icons/pointer-place.svg'
import mapPolygonIcon from '@dataforsyningen/designsystem/assets/icons/polygon.svg'

export const FALLBACK_ICON = closeIcon

export const RESOURCES = [
	{
		resource: 'navngivenvej',
		title: 'Navngivenvej',
		icon: mapVejIcon
	},
	{
		resource: 'husnummer',
		title: 'Husnummer',
		icon: mapAdresseIcon
	},
	{
		resource: 'adresse',
		title: 'Adresse',
		icon: mapAdresseIcon
	},
	{
		resource: 'stednavn',
		title: 'Stednavn',
		icon: mapStedIcon
	},
	{
		resource: 'kommune',
		title: 'Kommune',
		icon: mapPolygonIcon
	},
	{
		resource: 'region',
		title: 'Region',
		icon: mapPolygonIcon
	},
	{
		resource: 'retskreds',
		title: 'Retskreds',
		icon: mapPolygonIcon
	},
	{
		resource: 'postnummer',
		title: 'Postnummer',
		icon: mapPolygonIcon
	},
	{
		resource: 'opstillingskreds',
		title: 'Opstillingskreds',
		icon: mapPolygonIcon
	},
	{
		resource: 'sogn',
		title: 'Sogn',
		icon: mapPolygonIcon
	},
	{
		resource: 'politikreds',
		title: 'Politikreds',
		icon: mapPolygonIcon
	},
	{
		resource: 'matrikel',
		title: 'Matrikel',
		icon: mapPolygonIcon
	},
	{
		resource: 'matrikel_udgaaet',
		title: 'Matrikel udgået',
		icon: mapPolygonIcon
	}
]