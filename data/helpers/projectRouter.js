const express = require('express')
const projects = require('./projectModel')

const router = express.Router();

router.get('/', (req,res) => {
    projects.get()
        .then(acts => 
            res.status(200).send(acts)
    ).catch((error)=>
        res.status(500).json({message:"request failed"})
    )
})

router.get('/:id', validateId,(req,res) => {
    const {id} = req.params

    projects.get(id)
        .then(acts => 
            res.status(200).send(acts)
    ).catch((error)=>
        res.status(500).json({message:"request failed"})
    )
})

router.post('/', (req,res) => {
    const newPost = req.body
    projects.insert(newPost)
        .then(post => {
            res.status(200).send(post)
        }).catch( err => {
            res.status(500).json({message:"request post failed"})
        })
})

router.delete('/:id',validateId, (req,res) => {
    const {id} = req.params
    projects.remove(id)
        .then( removed => {
            res.status(200).json({message:"project romoved"})
        }).catch( err => {
            res.status(500).json({message:"delete failed"})
        })
})

router.put('/:id',validateId, (req,res)=> {
    const {id} = req.params
    const changes = req.body
    projects.update(id,changes)
        .then( updated => {
            res.status(200).send(updated)
        })
})

router.get('/:id/actions',validateId,(req,res)=> {

    const {id} = req.params

    projects.getProjectActions(id)
        .then(acts => 
            res.status(200).send(acts)
    ).catch((error)=>
        res.status(500).json({message:"request failed"})
    )

})

function validateId(req, res, next) {
    // do your magic!
    const{id} = req.params
  
    projects.get(id)
      .then( found => found.id == id && next())
      .catch(err =>res.status(400).json({message:"id not found"}))
  }



module.exports = router;