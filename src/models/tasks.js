import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
    tasks_name: {type: String, required: true},
    tasks_description: {type: String, required: true},
    assignee:  {type:String, required: true},
    due_date: {type: Date, required: true},
    status: {type: String, required: true},
    commnets: {type: String},
    userOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'users' ,required: true}
})

export const TaskModel = mongoose.model('tasks', TasksSchema)