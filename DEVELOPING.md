# Developing

## Configuration (config.js)
To run the test server a `config.js` file is required in the root folder.  You'll need to supply your own token for your particular configuration. You can copy and edit `config.example.js` to use as your own `config.js`.

## Building test files
Start by installing the dependencies with `npm install`. Then create a config with tokens from dataforsyningen.dk and https://datafordeler.dk/ in the root folder (see `config.example.js` for an example config). After that you can run the test server with `npm run dev` which will run a server that serves all the test html files at `localhost:8000`.
