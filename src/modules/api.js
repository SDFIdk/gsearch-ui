const gsearchUrl = 'https://api.dataforsyningen.dk/gsearch_test/v1.0/'
const defaultResources = 'navngivenvej,husnummer,adresse,stednavn,kommune,region,retskreds,postnummer,opstillingskreds,sogn,politikreds,matrikel'
const defaultLimit = 10

let error_msg

/** Getter for error messages */
function getErrorMsg() {
  return error_msg
}

/** Returns response data */
function HttpResponseHandler(response, is_json) {
  if (!response.ok) {
    error_msg = response.status
    // interruptLoading()
    throw new Error(`HTTP error! ${ response.status }`)
  }
  if (is_json) {
    // We assume the returned data is JSON
    return response.json()
  } else {
    // Return whatever and let someone else worry about parsing it
    return response
  }
  
}

/** 
 * GET HTTP responsee from API
 * @param {string} url - API service URL, including endpoint paths and query parameters.
 * @param {object} [config] - Custom request configs. See https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
 * @param {boolean} [is_json] - `true` if requested output is JSON
 * @returns {object} response object
 */
 function get(url, config = {}, is_json = true) {
  if (!url) {
    console.error('Could not fetch data. Missing API URL')
  } else {
    // startLoading()
    return fetch( url, {
      ...config,
      method: 'GET'
    })
    .then((response) => {
      return HttpResponseHandler(response, is_json)
    })
    .then((response) => {
      // Finally, return the parsed JSON response
      // endLoading()
      return response
    })
    .catch((error) => {
      // ... unless something goes wrong
      console.error(`Fetch error: ${error}`)
      // endLoading()
      return error
    })
  }
}

function search(searchString, token, resources, limit) {
  // if missing values use defaults
  if (!resources) {
    resources = defaultResources
  }
  if (!limit) {
    limit = defaultLimit
  }
  const promises = []
  const splitString = resources.split(',')
  splitString.forEach(string => {
    const url = gsearchUrl + string + '?token=' + token + '&q=' + searchString + '&limit=' + limit
    promises.push(get(url).then(response => {
      if (!response[0]) {
        return
      }
      response.forEach(el => {
        el.type = string
      })
      return response
    }))
  })
  return Promise.all(promises)
}

export {
  getErrorMsg,
  search
}
