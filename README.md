# GSearch-UI

A web component that implements a simple UI for [GSearch](https://github.com/SDFIdk/gsearch).

## Demo

Demo page at https://sdfidk.github.io/gsearch-ui/

## Installation

### npm

```bash

$ npm i @dataforsyningen/gsearch-ui -S

```

## Usage

To use GSearch-UI you must first create a user at https://dataforsyningen.dk/ and create a token.

You can then use GSearch-UI like in the example below.

```html
<main>
  <g-search data-token="INSERTYOURTOKENHERE"></g-search>
</main>
<script type="module">
  import { GSearchUI } from '@dataforsyningen/gsearch-ui'
  customElements.define('g-search', GSearchUI)
  document.querySelector("g-search").addEventListener('gsearch:select', (event) => {
    // handle the click here
    // event.detail contains the result object
  })
</script>
```

### Data attributes

GSearch-UI is configured using html data attributes.

|attribute name|description|required|updates dynamically|default|
|:---|---|---|---|---|
|`data-token`|A valid token from https://dataforsyningen.dk/|yes|yes|`NaN`|
|`data-resources`|The resources that should be searched in. See more information in the [GSearch documentation](https://github.com/SDFIdk/gsearch/tree/main/doc)|no|yes|`navngivenvej,husnummer,adresse,stednavn,kommune,region,retskreds,postnummer,opstillingskreds,sogn,politikreds,matrikel,matrikel_udgaaet`|
|`resourceFilterEnabled`|Show filter buttons for the selected resources to allow the user to toggle resources.|no|yes|`false`|
|`data-limit`|The number of matches for each resource to be shown. The maximum value is 100.|no|yes|`10`|
|`data-placeholder`|The placeholder text to show in the input field.|no|yes|`søg...`|
|`data-api`|Use a custom URL for GSearch API (ie. if you want to use a test API)|no|yes|`https://api.dataforsyningen.dk/rest/gsearch/v1.0/`|
|`data-filter`|Use a custom filter in the search query. [Learn about filters in the GSearch docs.](https://github.com/SDFIdk/gsearch/tree/main/doc#filter)|no|no|`none`|

### On click event

When clicking on a result displayed in the GSearch-UI it will dispatch a custom event, `gsearch:select`, that contains the result object in event.detail. The structure of the object depends on the resource. See more information about the different resouces here: https://github.com/SDFIdk/gsearch/tree/main/doc.

Clicking the cross to clear the input field fires a custom event, `gsearch:clear`.

## Publish NPM

Create a new release in Github to publish an updated NPM package.
Details are available in the "Npm" section of SDFI ITU's wiki.

## Acknowledgements

GSearch-UI is made available under the MIT license by
Styrelsen for Dataforsyning og Infrastruktur @ [SDFI](https://sdfi.dk/)
