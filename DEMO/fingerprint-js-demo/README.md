# Fingerprint.js Demo

![Fingerprint.js Demo](./fingerprintjs-demo.gif)

A temporary live demo is available at [demo.cpixl.com](https://cpixl.com/int4-fingerprint-demo)

## Try it yourself

To get a local copy up and running follow these simple steps.

### Prerequisites

We'll assume you have the latest node version and yarn installed already.

**NOTE: You need to get an api key from [Fingerprintjs.com](https://fingerprintjs.com/) and create a `.env` file in the root directory  with these values**
```dotenv
REACT_APP_FPJS_TOKEN=
REACT_APP_FPJS_APIKEY=
REACT_APP_FPJS_REGION=
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CorruptedPixl/integration4.git
   ```
2. Navigate to folder and install packages
   ```sh
   cd DEMO/fingerprint-js-demo && yarn
   ```
3. Run this demo
   ```sh
   yarn dev
   ```

You're good to go. Have fun!

If you're having issues with adblocker blocking requests, either turn it off, or set up a subdomain as described in the [fingerprint.js docs.](https://dev.fingerprintjs.com/docs/subdomain-integration)