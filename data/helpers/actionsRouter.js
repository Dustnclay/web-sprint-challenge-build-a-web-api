const express = require('express')
const actions = require('./actionModel')

const router = express.Router();

router.get('/', (req,res) => {
    
    actions.get()

        .then((acts) => { 
            res.status(200).send(acts)}
    ).catch((error)=>
        res.status(500).json({message:"request failed"})
    )
})

router.get('/:id', validateId, (req,res) => {
    
    const{id} = req.params
    actions.get(id)
        .then(acts => 
            res.status(200).send(acts)
    ).catch((error)=>
        res.status(500).json({message:"request failed"})
    )
})

router.post('/', (req,res) => {
    const newAction = req.body
    actions.insert(newAction)
        .then(post => {
            res.status(200).send(newAction)
        }).catch( err => {
            res.status(500).json({message:"request post action failed"})
        })
})

router.delete('/:id', (req,res) => {
    const {id} = req.params
    actions.remove(id)
        .then( removed => {
            res.status(200).json({message:"action romoved"})
        }).catch( err => {
            res.status(500).json({message:"delete failed"})
        })
})

router.put('/:id', (req,res)=> {
    const {id} = req.params
    const changes = req.body
    actions.update(id,changes)
        .then( updated => {
            res.status(200).send(updated)
        })
})

function validateId(req, res, next) {
    // do your magic!
    const{id} = req.params
  
    actions.get(id)
      .then( found => found.id == id && next())
      .catch(err =>res.status(400).json({message:"id not found"}))
  }

module.exports = router;