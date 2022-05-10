const Task = require('../models/taskModel');

const getTaskController = async (req, res) => {
    const { _id } = req.user;
    try {
        const tasks = await Task.find({ userId: _id });
        return res.json({ tasks });
    } catch (error) {
        return res.json({ serverError: 'Something went wrong' });
    }
};

const addTaskController = async (req, res) => {
    const { _id } = req.user;
    const { task } = req.body;
    try {
        const newtask = await Task.create({ task, userId: _id });
        return res.json({ newtask });
    } catch (error) {
        return res.json({ serverError: 'Something went wrong' });
    }
};

const updateTaskController = async (req, res) => {
    const { _id } = req.user;
    const { task } = req.body;
    const { id } = req.params; 
    try {
        const updatedTask = await Task.findOneAndUpdate({
            _id: id,
            userId: _id
        }, {
            task
        }, {
            new: true
        });
        return res.json({ updatedTask });
    } catch (error) {
        return res.json({ serverError: 'Something went wrong' });
    }
};

const checkTaskController = async (req, res) => {
    const { _id } = req.user;
    const { checked } = req.body;
    const { id } = req.params;
    try {
        const checkedTask = await Task.findOneAndUpdate({
            _id: id,
            userId: _id
        }, {
            checked
        }, {
            new: true
        });
        return res.json({ checkedTask });
    } catch (error) {
        return res.json({ serverError: 'Something went wrong' });
    }
};

const deleteTaskController = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    try {
        await Task.findOneAndRemove({
            _id: id,
            userId: _id
        });
        return res.json({ taskDeleted: true });
    } catch (error) {
        return res.json({ serverError: 'Something went wrong' });
    }
};

module.exports = {
    getTaskController,
    addTaskController,
    updateTaskController,
    checkTaskController,
    deleteTaskController
}