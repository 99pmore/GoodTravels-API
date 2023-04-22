const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Obtener lista de usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)

  } catch (error) {
    console.error(error)
    res.status(404).json({ message: 'Usuario no encontrado' })
  }
})

// Login de un usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    res.status(200).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Crear un usuario
router.post('/users', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    res.status(201).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Obtener datos de un usuario
router.get('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Obtener un usuario por su email
router.get('/users/email/:email', async (req, res) => {
  const { email } = req.params

  try {
    const user = await User.findOne({ email: email })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.status(200).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Actualizar datos de un usuario
router.patch('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    if (name) {
      user.name = name
    }

    if (email) {
      user.email = email
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword
    }

    await user.save()
    res.status(201).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Eliminar un usuario
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(204).send()

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Obtener lista de países visitados de un usuario
router.get('/users/:id/countriesVisited', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json(user.countriesVisited)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Obtener lista de países por visitar de un Usuario
router.get('/users/:id/countriesToVisit', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json(user.countriesToVisit)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Añadir un país a la lista de países visitados de un usuario
router.post('/users/:id/countriesVisited', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const user = await User.findById(id)
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    user.countriesVisited.push(name)
    await user.save()
    res.status(201).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Añadir un país a la lista de países visitados de un usuario
router.post('/users/:id/countriesToVisit', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const user = await User.findById(id)
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    user.countriesToVisit.push(name)
    await user.save()
    res.status(201).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Marcar un país como visitado desde la lista de países por visitar de un usuario
router.patch('/users/:id/countriesVisited', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const indexCountry = user.countriesToVisit.indexOf(name)
    if (indexCountry < 0) {
      return res.status(404).json({ message: 'País no encontrado en la lista de países por visitar' })
    }

    user.countriesToVisit.splice(indexCountry, 1)
    user.countriesVisited.push(name)
    await user.save()
    res.status(201).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Marcar un país como por visitar desde la lista de países visitados de un usuario
router.patch('/users/:id/countriesToVisit', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const indexCountry = user.countriesVisited.indexOf(name)
    if (indexCountry < 0) {
      return res.status(404).json({ message: 'País no encontrado en la lista de países visitados' })
    }

    user.countriesVisited.splice(indexCountry, 1)
    user.countriesToVisit.push(name)
    await user.save()
    res.status(201).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Eliminar un país de la lista de visitados de un usuario
router.delete('/users/:id/countriesVisited', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const indexCountry = user.countriesVisited.indexOf(name)
    if (indexCountry < 0) {
      return res.status(404).json({ message: 'País no encontrado en la lista de países por visitar' })
    }

    user.countriesVisited.splice(indexCountry, 1)
    await user.save()
    res.status(204).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

// Eliminar un país de la lista de por visitar de un usuario
router.delete('/users/:id/countriesToVisit', async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const indexCountry = user.countriesToVisit.indexOf(name)
    if (indexCountry < 0) {
      return res.status(404).json({ message: 'País no encontrado en la lista de países por visitar' })
    }

    user.countriesToVisit.splice(indexCountry, 1)
    await user.save()
    res.status(204).send(user)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

module.exports = router