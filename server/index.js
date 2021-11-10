const path = require('path');
const fs = require('fs');
const express = require('express');

const PORT = process.env.PORT || 3006;
const app = express();

const babelRegister = require('@babel/register');
babelRegister({
  ignore: [/[\\\/](build|server\/server|node_modules)[\\\/]/],
  presets: [['react-app', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
});

const render = require('./render');

app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    // Artificially delay serving JS
    // to demonstrate streaming HTML.
    setTimeout(next, 0);
  } else {
    next();
  }
});

app.get('/', async(req, res) => {
  await waitForWebpack();
  render(req.url, res);
});

app.use(express.static('build'));
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

async function waitForWebpack() {
  while (true) {
    try {
      fs.readFileSync(path.resolve(__dirname, '../build/main.js'));
      return;
    } catch (err) {
      console.log(
        'Could not find webpack build output. Will retry in a second...'
      );
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}