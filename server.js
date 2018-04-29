const express = require('express');

const app = express();
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 5002;

app.use(cors());

app.get('/api/catalog', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(__dirname, 'item-data.json'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
