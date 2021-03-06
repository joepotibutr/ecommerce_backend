import express from 'express'
import User from '../models/user'

const router = express.Router()

router.get("/",(req,res) => {
    User.find()
    .then(user => {
        res.json(user)
    })
    .catch(err => res.status(400).json({ errors : err.errors }))
})

router.post('/', (req,res) => {
    const { credentials } = req.body
    User.findOne({ email : credentials.email }).then(user => {
        if(user && user.isValidPassword(credentials.password)) {
            res.json({ user : user.toAuthJSON() })
        } else {
            res.status(400).json({ errors : { global : "Invalid credentials" }})
        }
    })
})

export default router
