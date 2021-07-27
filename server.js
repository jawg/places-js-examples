const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const CLEAN_REGEX = new RegExp('//+', 'g');
const YOUR_ACCESS_TOKEN = /<YOUR_ACCESS_TOKEN>/g;

app.use((req, res, next) => {
  const file = `./examples/${req.url}`.replace(CLEAN_REGEX, '/');
  if (fs.existsSync(file)) {
    if (req.url.endsWith('.html')) {
      res.send(fs.readFileSync(file).toString().replace(YOUR_ACCESS_TOKEN, process.env.JAWG_ACCESS_TOKEN));
    } else {
      const files = fs.readdirSync(file) || [];
      res.send(`
<html><head><title>Index of ${file}</title></head>
<body>
<h1>Index of ${file}</h1>
<hr><pre><a href="../">../</a>
${files.map((f) => `<a href="${req.url.endsWith('/') ? './' : req.url.split('/').pop()}/${f}">${f}</a>`).join('\n')}
</pre><hr>
</body></html>
`);
    }
  }
  next();
});

app.listen(port, 'localhost', () => {
  console.log(`Example app listening at http://localhost:${port}`);
});