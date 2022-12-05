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
  import { GSearchUI } from './search.js'
  customElements.define('g-search', GSearchUI)
</script>
```

### Data attributes

GSearch-UI is configured using html data attributes.

|attribute name|description|required|updates dynamically|default|
|:---|---|---|---|---|
|`data-token`|T valid token from https://dataforsyningen.dk/|yes|yes|`NaN`|
|`data-resources`|The resources that should be searched in. See more information in the [GSearch documentation](https://github.com/SDFIdk/gsearch/tree/dokumentation/doc)|no|yes|`navngivenvej,husnummer,adresse,stednavn,kommune,region,retskreds,postdistrikt,opstillingskreds,sogn,politikreds,matrikelnummer`|

