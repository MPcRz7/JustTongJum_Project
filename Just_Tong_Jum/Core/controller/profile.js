const Profile = require("../model/profile.model")
const GroupVocabs = require("../model/groupVocabs.model")
const Vocab = require('../model/vocab.model')

module.exports = (app) => {
    app.get('/profile', async (req, res) => {
        const profiles = await Profile.find()
        res.json(profiles)
    })

    app.get('/profile/:id', async (req, res) => {
        const profile = await Profile.findById(req.params.id)
        res.json(profile)
    })

    app.post('/profile', async (req, res) => {
        const { username, password, firstname, surname } = req.body
        const profile = new Profile({ username, password, firstname, surname })
        const result = await profile.save()
        res.json(result)
    })

    app.put('/profile/:id', async (req, res) => {
        const { username, password, firstname, surname } = req.body
        try {
            const result = await Profile.findByIdAndUpdate(req.params.id, {
                username,
                password, 
                firstname, 
                surname
            }, {
                    new: true
                })
            if (!result) {
                return res.status(404).json({ message: 'Entity not found' })
            }
            res.json(result)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    app.delete('/profile/:id', async (req, res) => {
        try {
            const allGroupOfThisUser =  await GroupVocabs.find({ userId : req.params.id})           
            for (let i = 0; i < allGroupOfThisUser.length; i++){
               await Vocab.find({ groupVocabId : allGroupOfThisUser[i]._id }).remove()
            }
            await GroupVocabs.find({ userId : req.params.id}).remove()  
            const result = await Profile.findByIdAndDelete(req.params.id)
            if(!result) {
                return res.status(404).json({message: 'Entity not found'})
            }
            res.json(result)
        } catch (e) {
            res.status(400).json ({ message: e. message })
        }
    })
}