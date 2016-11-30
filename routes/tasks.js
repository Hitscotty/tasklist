const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://Scotty:scotty@ds117348.mlab.com:17348/mytasklistscotty', ['tasks']);

// Get all Tasks
router.get('/tasks', (req, res, next) => {
    db.tasks.find( (err, tasks) => {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});


// get single task
router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, tasks) => {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});


// save task
router.post('/task', (req, res, next) => {
    const task = req.body;
    if(!task.title || (task.isDone + '')){
        res.status(400);
        res.json({ 
            "error": "Bad data"
        });
    
    } else {
        db.tasks.save(task, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// delete task
router.delete('/task/:id', (req, res, next) => {
    db.tasks.findOne({_id: mongojs.Objects(req.params.id)}, (err, tasks) => {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

module.exports = router; 
