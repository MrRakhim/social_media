const experss = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('./models');
const app = experss();
const API_KEY = '1166f64dd420024e4f6a3917115e8aaa';

async function getWeather(req, res) {
	const { name } = req.query;

	if (!name) return res.status(400).json({message: '"name" is required.'});
	try {
		const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`);

		return res.status(200).json(data);
	} catch (error) {
		console.dir(error);
		return res.json(error);
	}
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
	return res.json({ message: 'hello' });
})

app.get('/getPeople', async (req, res) => {
	let { nationality, amount } = req.query;

	if (!nationality) return res.status(400).json({message: '"nationality" is required.'});
	if (typeof nationality !== 'string') return res.status(400).json({message: '"nationality" is invalid.'})
	nationality.toUpperCase(nationality);

	amount = parseFloat(amount);
	if (!amount) return res.status(400).json({message: '"amount" is required or invalid'});

	try {
		axios.get(`https://apirandomuser.me?nat=${nationality}&results=${amount}`).then(result => {
		
			return res.status(200).json(result.data.results);
		}).catch(error => {
			return res.json(error);
		});


	} catch (error) {
		return res.status(400).json(error);
	}



})

app.get('/getWeather', getWeather)

app.post('/products', async (req, res) => {
	try {
		let {
			title,
			description,
			price
		} = { ...req.body, ...req.query };

		if (!title) return res.status(400).json({message: '"title" is required.'});
		if (typeof title !== 'string') return res.status(400).json({message: 'Invalid type for "title".'});
		
		if (!description) return res.status(400).json({message: '"description" is required.'});
		if (typeof description !== 'string') return res.status(400).json({message: 'Invalid type for "description".'});

		price = parseFloat(price);
		if (!price) return res.status(400).json({message: 'Invalid "price"'});

		await db.Products.create({
			title,
			description,
			price,
			date: new Date()
		});
		return res.status(200).json({ message: "Product is created!" });
	} catch (error) {
		console.dir(error);
		return res.status(500).json(error);
	}
});

app.get('/products', async (req, res) => {
	try {

		const products = await db.Products.findAll();

		if (!products) return res.status(500).json({ message: "Product is not exist." });

		return res.status(200).json(products);

	} catch (error) {
		console.dir(error);
		return res.status(500).json(error);
	}
})


app.listen(5520, () => {
	console.log('Everything\'s ok at 5520');
})