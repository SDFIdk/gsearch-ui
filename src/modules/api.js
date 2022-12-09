const gsearchUrl = 'https://api.dataforsyningen.dk/gsearch_test/v1.0/search?'
const defaultResources = 'navngivenvej,husnummer,adresse,stednavn,kommune,region,retskreds,postdistrikt,opstillingskreds,sogn,politikreds,matrikelnummer'

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

/** 
 * POST HTTP request to API
 * @param {string} url - API service URL, including endpoint paths and query parameters.
 * @param {object} requestbody - Request data
 * @param {string} token - Authentication token from Dataforsyningen
 * @returns {object} response object
 */
 function post(url, requestbody, token) {
  if (!url || !token || !requestbody) {
    console.error('Could not fetch data. Missing API token, request body, or URL')
  } else {
    // startLoading()
    return fetch( url, {
      method: 'POST',
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestbody)
    })
    .then((response) => {
      return HttpResponseHandler(response)
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
  if (!resources) {
    resources = defaultResources
  }
  const url = gsearchUrl + 'token=' + token + '&q=' + searchString + '&resources=' + resources + '&limit=' + limit
  return get(url)
}

export {
  getErrorMsg,
  search
}
