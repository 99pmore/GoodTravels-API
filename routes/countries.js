const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/countries', async (req, res) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countries = (await response.json()).map(country => ({
      name: country.name.common,
      region: country.region,
      flag: country.flags.svg,
      capital: country.capital,
      subregion: country.subregion,
      population: country.population,
      map: country.maps.googleMaps,
    }))
    res.send(countries)

  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor')
  }
})

router.get('/countries/:name', async (req, res) => {
  try {
    const { name } = req.params
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)
    const countries = (await response.json()).map(country => ({
      name: country.name.common,
      region: country.region,
      flag: country.flags.svg,
      capital: country.capital,
      subregion: country.subregion,
      population: country.population,
      map: country.maps.googleMaps,
    }))
    res.send(countries)

  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor')
  }
})

module.exports = router