import express from 'express';
import { TaskModel } from "../models/tasks.js";

const router = express.Router()

// this is done for getting all the data
router.get('/', async(req,res) => {
    try{
     const response = await TaskModel.find({})
     res.json(response)
    } catch(err) {
        res.json(err)
    }
})

// this is done creating data in the server
router.post('/', async(req,res) => {
    const task = new TaskModel(req.body)
    try{
     const response = await task.save()
     res.json(response)
    } catch(err) {
        res.json(err)
    }
})

// this is done for update status button
router.put('/update', async (req, res) => {
    const id = req.body.id;
    const newStatus = req.body.newStatus;

    try {
        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = newStatus;
        await task.save();

        res.json({ message: 'Task status updated successfully' });
    } catch (err) {
        console.error("Error during task status update:", err);
        res.status(500).json({ error: "Error during task status update" });
    }
});


// this is done for view details button
router.get('/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await TaskModel.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(task);
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      res.status(500).json({ error: "Error fetching task by ID" });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const task = await TaskModel.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not Found' });
      }
  
      // Delete the task from the database
      await TaskModel.deleteOne({ _id: id });
  
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error("Error deleting task by ID", err);
      res.status(500).json({ error: "Error deleting task by ID" });
    }
  });


export { router as taskRouter };

