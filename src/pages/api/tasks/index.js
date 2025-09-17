import { dbConnect } from "@/src/utils/mongoose";
import Task from "@/src/models/Task";

dbConnect()

export default async function handler(req, res) {

  const {method, body} = req;// destructuring extraer lo valores que vienen de request
  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (error) {
        return res.status(500).json({error: "Error.message"})
      }

    case 'POST':
      try {
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
      } catch (error) {
        return res.status(500).json({error: "Error.message"})
      }
    
    default:
      return res.status(400).json({msn: "This method is not suppported"});
  }
}