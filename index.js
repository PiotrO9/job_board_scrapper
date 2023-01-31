const ScraperWithFilter = require('./utils/ScraperWithFilter.js');
const PrepareExperienceAndRequirementsQuery = require('./utils/PrepareExperienceAndRequirementsQuery.js');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
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

app.get('/experience/:seniority', (req, res) => {
    let seniority = req.params.seniority;
    ScraperWithFilter(`https://nofluffjobs.com/pl/?criteria=seniority%3D${seniority}&page=1`)
        .then((JobOffers) => res.send(JobOffers))
})

app.get('/experience/:seniority/:page', (req, res) => {
    let seniority = req.params.seniority;
    let pageNumber = req.params.page;
    ScraperWithFilter(`https://nofluffjobs.com/pl/?criteria=seniority%3D${seniority}&page=${pageNumber}`)
        .then((JobOffers) => res.send(JobOffers))
})

app.get('/experienceAndRequirements/:seniority/:requirements', (req, res) => {
    let seniority = req.params.seniority;
    let requirements = req.params.requirements;

    ScraperWithFilter(PrepareExperienceAndRequirementsQuery(seniority, requirements))
        .then((JobOffers) => res.send(JobOffers))
})

app.get('/experienceAndRequirementsAndPage/:seniority/:requirements/:page', (req, res) => {
    let seniority = req.params.seniority;
    let requirements = req.params.requirements;
    let pageNumber = req.params.page;

    ScraperWithFilter(PrepareExperienceAndRequirementsQuery(seniority, requirements, pageNumber))
        .then((JobOffers) => res.send(JobOffers))
})

//Conecting criteries

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});