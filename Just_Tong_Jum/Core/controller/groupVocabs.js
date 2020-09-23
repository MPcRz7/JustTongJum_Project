const GroupVocabs = require("../model/groupVocabs.model")
const Vocab = require('../model/vocab.model')

module.exports = (app) => {
    app.get('/groupVocabs', async (req, res) => {
        const groupVocabs = await GroupVocabs.find()
        res.json(groupVocabs)
    })

    app.get('/groupVocabs/:id', async (req, res) => {
        const groupVocabs = await GroupVocabs.findById(req.params.id)
        res.json(groupVocabs)
    })

    // app.post('/groupVocabs', async (req, res) => {
    //     const { firstLabel, secondLabel, firstText, secondText, check } = req.body
    //     const groupVocabs = new GroupVocabs({ firstLabel, secondLabel, firstText, secondText, check })
    //     const result = await groupVocabs.save()
    //     res.json(result)
    // })

    app.post('/groupVocabs', async (req, res) => {
        const { userId, 
            groupName, 
            firstLabel, 
            secondLabel, 
            thirdEnable,
            forthEnable,
            thirdLabel,
            forthLabel,
            groupOrder,
            titleNumber,
            subtitleNumber } = req.body
        const groupVocabs = new GroupVocabs({ 
            userId, 
            groupName, 
            firstLabel, 
            secondLabel, 
            thirdEnable,
            forthEnable,
            thirdLabel,
            forthLabel,
            groupOrder,
            titleNumber,
            subtitleNumber  })
        const result = await groupVocabs.save()
        res.json(result)
    })

    app.put('/groupVocabs/:id', async (req, res) => {
        const { userId, 
            groupName, 
            firstLabel, 
            secondLabel, 
            thirdEnable,
            forthEnable,
            thirdLabel,
            forthLabel,
            groupOrder,
            titleNumber,
            subtitleNumber } = req.body
        try {
            const result = await GroupVocabs.findByIdAndUpdate(req.params.id, {
            userId, 
            groupName, 
            firstLabel, 
            secondLabel, 
            thirdEnable,
            forthEnable,
            thirdLabel,
            forthLabel,
            groupOrder,
            titleNumber,
            subtitleNumber 
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

    // app.move('/groupVocabs', async (req, res) => {
        
    //     try {           
    //         //const result = await GroupVocabs.findByIdAndDelete(req.params.id)
    //         const allGroupOfThisUser =  await GroupVocabs.find({ userId : result.userId})
    //         for(let i = 0; i< allGroupOfThisUser.length; i++){
    //             //if(allGroupOfThisUser[i].groupOrder > result.groupOrder){
    //                 await GroupVocabs.findByIdAndUpdate(allGroupOfThisUser[i]._id, {
    //                 //userId: allGroupOfThisUser[i].userId, 
    //                 //groupName: allGroupOfThisUser[i].groupName, 
    //                 //firstLabel: allGroupOfThisUser[i].firstLabel, 
    //                 //secondLabel: allGroupOfThisUser[i].secondLabel, 
    //                 //thirdEnable: allGroupOfThisUser[i].thirdEnable,
    //                 //forthEnable: allGroupOfThisUser[i].forthEnable,
    //                 //thirdLabel: allGroupOfThisUser[i].thirdLabel,
    //                 //forthLabel: allGroupOfThisUser[i].forthLabel,
    //                 groupOrder: allGroupOfThisUser[i].groupOrder - 1
    //                 }, {
    //                         new: true
    //                     })
    //             //}
    //         }
    //         // if(!result) {
    //         //     return res.status(404).json({message: 'Entity not found'})
    //         // }
    //         // res.json(result)
    //     } catch (e) {
    //         res.status(400).json ({ message: e. message })
    //     }
    // })

    app.delete('/groupVocabs/:id', async (req, res) => {
        
        try {           
            await Vocab.find({ groupVocabId : req.params.id}).remove()
            const result = await GroupVocabs.findByIdAndDelete(req.params.id)
            //const result = await GroupVocabs.findById(req.params.id)
            const allGroupOfThisUser =  await GroupVocabs.find({ userId : result.userId})
            for(let i = 0; i< allGroupOfThisUser.length; i++){
                if(allGroupOfThisUser[i].groupOrder > result.groupOrder){
                    await GroupVocabs.findByIdAndUpdate(allGroupOfThisUser[i]._id, {
                    //userId: allGroupOfThisUser[i].userId, 
                    //groupName: allGroupOfThisUser[i].groupName, 
                    //firstLabel: allGroupOfThisUser[i].firstLabel, 
                    //secondLabel: allGroupOfThisUser[i].secondLabel, 
                    //thirdEnable: allGroupOfThisUser[i].thirdEnable,
                    //forthEnable: allGroupOfThisUser[i].forthEnable,
                    //thirdLabel: allGroupOfThisUser[i].thirdLabel,
                    //forthLabel: allGroupOfThisUser[i].forthLabel,
                    groupOrder: allGroupOfThisUser[i].groupOrder - 1
                    }, {
                            new: true
                        })
                }
            }
            if(!result) {
                return res.status(404).json({message: 'Entity not found'})
            }
            res.json(result)
        } catch (e) {
            res.status(400).json ({ message: e. message })
        }
    })

    app.delete('/groupVocabs', async (req, res) => {
        try {
            const result = await GroupVocabs.remove()
            if(!result) {
                return res.status(404).json({message: 'Entity not found'})
            }
            res.json(result)
        } catch (e) {
            res.status(400).json ({ message: e. message })
        }
    })
}