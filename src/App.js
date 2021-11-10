import React, {Suspense} from 'react';
import People from './People';

function App() {

  const Loader = () => (<h1>Loading...</h1>);

  function Html({ children, title }) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Thomas's Awesome Site" />
          <link rel="shortcut icon" href="favicon.ico" />
          <title>{title}</title>
        </head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<b>Enable JavaScript to run this app.</b>`
            }}
          />
          {children}
        </body>
      </html>
    );
  }

  return (
    <Html title="Thomas is Awesome">
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Suspense fallback={<Loader/>}>
            <People />
          </Suspense>
        </header>
      </div>
    </Html>
  );
}

export default App;
