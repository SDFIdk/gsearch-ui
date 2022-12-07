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
  <g-search id="gsearch" data-token="INSERTYOURTOKENHERE"></g-search>
</main>
<script type="module">
  import { GSearchUI } from './search.js'
  customElements.define('g-search', GSearchUI)
  document.getElementById('gsearch').addEventListener('gsearch:on-select', (event) => {
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
|`data-resources`|The resources that should be searched in. See more information in the [GSearch documentation](https://github.com/SDFIdk/gsearch/tree/dokumentation/doc)|no|yes|`navngivenvej,husnummer,adresse,stednavn,kommune,region,retskreds,postdistrikt,opstillingskreds,sogn,politikreds,matrikelnummer`|
|`data-limit`|The number of matches for each resource to be shown. The maximum value is 100.|no|yes|`10`|

### On click event

When clicking on a result displayed in the GSearch-UI it will dispatch a custom event, `gsearch:on-select`, that contains the result object in event.detail. The structure of the object depends on the resource. See more information about the different resouces here: https://github.com/SDFIdk/gsearch/tree/dokumentation/doc.
