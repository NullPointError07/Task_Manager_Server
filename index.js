import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';

import { taskRouter } from './src/routes/tasks.js';
import { userRouter } from './src/routes/users.js';

const app = express()

app.use(express.json())
app.use(cors())
dotenv.config();

app.use('/auth', userRouter)
app.use('/dashboard', taskRouter)

const admin = process.env.ADMIN
const password = process.env.PASSWORD

mongoose.connect(`mongodb+srv://${admin}:${password}@tasks.6buwucq.mongodb.net/tasks?retryWrites=true&w=majority`)

app.listen(5000, ()=>console.log('Server is running at port 5000'))