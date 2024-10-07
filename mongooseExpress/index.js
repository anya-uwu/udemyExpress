const express = require('express')
const app = express();
const path = require('path');

app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log('app is listening on port 3000')
})