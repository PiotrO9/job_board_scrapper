const ScraperWithFilter = require('./utils/ScraperWithFilter.js');
const ScraperFromDefaultPage = require('./utils/ScraperFromDefaultPage.js');
const ScraperWithCriterias = require('./utils/ScraperWithCriterias.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(cors());

app.post('/queryWithCriterias', (req, res) => {
    const data = req.body;

    ScraperWithCriterias(data)
        .then((result) => {
            ScraperWithFilter(result)
                .then(jobOffers => res.send(jobOffers));
        })
});

app.get('/', (req, res) => {
    ScraperFromDefaultPage()
        .then(jobOffersResponse => res.send(jobOffersResponse))
});

app.get('/simplequery/:query', (req, res) => {
    let query = req.params.query;
    ScraperWithFilter(`https://nofluffjobs.com/pl/${query}?page=1`)
        .then((JobOffers) => res.send(JobOffers))
})

app.get('/simplequery/:query/:page', (req, res) => {
    let query = req.params.query;
    let pageNumber = req.params.page;
    ScraperWithFilter(`https://nofluffjobs.com/pl/${query}?page=${pageNumber}`)
        .then((JobOffers) => res.send(JobOffers))
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});