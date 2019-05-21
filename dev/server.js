const express = require('express');
const app = express();
app.use('/ehr', express.static('ehr'));
app.use('/smart', express.static('smart'));
app.use('/dist', express.static('dist'));

app.get('/', async (req, res) => {
  res.redirect('/ehr');
});

app.listen(3000, () => {
  console.log('Server started on port 3000.');
});
