
const Vocab = require('../model/vocab.model')
module.exports = (app) => {
    app.get('/vocab', async (req, res) => {
        const vocabs = await Vocab.find()
        res.json(vocabs)
    })

    app.get('/vocab/:id', async (req, res) => {
        const vocab = await Vocab.findById(req.params.id)
        res.json(vocab)
        // res.json(VOCAB.find(item => item.id === req.params.id))
    })

    app.post('/vocab', async (req, res) => {
        const { groupVocabId, 
            firstText, 
            secondText,
            thirdText,
            forthText,
            vocabOrder,
            check } = req.body
        const vocab = new Vocab({ groupVocabId, 
            firstText, 
            secondText,
            thirdText,
            forthText,
            vocabOrder,
            check })
        const result = await vocab.save()
        res.json(result)
    })

    app.put('/vocab/:id', async (req, res) => {
        // const index = VOCAB.findIndex(item => item.id === req.params.id)
        // VOCAB[index].name = req.body.name
        // VOCAB[index].meaning = req.body.meaning
        // res.json(VOCAB[index])
        const { groupVocabId, 
            firstText, 
            secondText,
            thirdText,
            forthText,
            vocabOrder,
            check } = req.body
        try {
            const result = await Vocab.findByIdAndUpdate(req.params.id, {
                groupVocabId, 
                firstText, 
                secondText,
                thirdText,
                forthText,
                vocabOrder,
                check
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

    app.delete('/vocab/:id', async (req, res) => {
        // VOCAB = VOCAB.filter(item => item.id !== req.params.id)
        // res.json({ message: 'success' })
        try {
            const result = await Vocab.findByIdAndRemove(req.params.id)
            const allVocabOfThisGroup =  await Vocab.find({ groupVocabId : result.groupVocabId})
            for(let i = 0; i< allVocabOfThisGroup.length; i++){
                if(allVocabOfThisGroup[i].vocabOrder > result.vocabOrder){
                    await Vocab.findByIdAndUpdate(allVocabOfThisGroup[i]._id, {
                        vocabOrder: allVocabOfThisGroup[i].vocabOrder - 1
                    }, {
                            new: true
                        })
                }
            }
            if (!result) {
                return res.status(404).json({ message: 'Entity not found' })
            }
            res.json(result)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    app.delete('/vocab', async (req, res) => {
        // VOCAB = VOCAB.filter(item => item.id !== req.params.id)
        // res.json({ message: 'success' })
        try {
            const result = await Vocab.remove()
            if (!result) {
                return res.status(404).json({ message: 'Entity not found' })
            }
            res.json(result)
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })
}