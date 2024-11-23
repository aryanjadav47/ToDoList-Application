const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  completeTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:id', updateTask);
router.patch('/tasks/:id/complete', completeTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
