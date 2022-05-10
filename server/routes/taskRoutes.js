const express = require('express');
const router = express.Router();

const { 
    getTaskController,
    addTaskController,
    updateTaskController,
    checkTaskController,
    deleteTaskController
 } = require('../controllers/taskControllers');
 
const requiresAuth = require('../middlewares/requiresAuth');

router.get('/', requiresAuth, getTaskController);
router.post('/add', requiresAuth, addTaskController);
router.put('/update/:id', requiresAuth, updateTaskController);
router.put('/checked/:id', requiresAuth, checkTaskController);
router.delete('/delete/:id', requiresAuth, deleteTaskController);

module.exports = router;