import * as React from 'react';
import { renderToPipeableStream } from 'react-dom/server';

import App from '../src/App';
import { DataProvider } from '../src/DataContext';

const assets = {
  "main.js": "/main.js",
};

module.exports = function render(url, res) {

  // const app = ReactDOMServer.renderToString(<DataProvider data={createServerData()}>
  //     <Suspense fallback={<h1>Loading...</h1>}>
  //       <App/>
  //     </Suspense>
  // </DataProvider>);
  let didError = false;
  const data = createServerData();
  const { pipe, abort } = renderToPipeableStream(
    <DataProvider data={data}>
      <App />
    </DataProvider>,
    {
      bootstrapScripts: [assets["main.js"]],
      onCompleteShell() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onError(x) {
        didError = true;
        console.error(x);
      }
    }
  );

  setTimeout(abort, 10000);

  // const indexFile = path.resolve('./build/index.html');
  // fs.readFile(indexFile, 'utf8', (err, data) => {
  //   if (err) {
  //     console.error('Something went wrong:', err);
  //     return res.status(500).send('Oops, better luck next time!');
  //   }

  //   return res.send(
  //     data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  //   );
  // });

};

function createServerData() {
  let done = false;
  let promise = null;
  return {
    read() {
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise((resolve) => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve();
        }, 2000);
      });
      throw promise;
    }
  };
}