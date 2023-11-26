// pages/_app.js

import React from 'react';
import './../src/app/globals.css'; // Make sure this path is correct

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
