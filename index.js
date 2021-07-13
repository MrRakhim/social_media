const experss = require('express');
const bodyParser = require('body-parser');
const app = experss();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routers'))


app.listen(5520, () => {
	console.log('Everything\'s ok at 5520');
})