import { dbConnect } from "@/src/utils/mongoose";
import Task from "@/src/models/Task";

dbConnect(); 

export default async (req, res) => {
    const { method, body, query:{id},} = req; //destructuring extraer lo valores que vienen de request

    switch (method) {
        case "GET":
            try {
                const task = await Task.findById(id);
                if (!task) return res.status(404).json({ msn: "Task not found" });
                return res.status(200).json(task);
            } catch (error) {
                return res.status(500).json({ msn: error.message });
            }
        case "PUT":
          
        case "DELETE":
            try {
                const deletedTask = await Task.findByIdAndDelete(id);
                if (!deletedTask) return res.status(404).json({ msn: "Task not found" });
                return res.status(204).json();
            } catch (error) {
                return res.status(500).json({ msn: error.message });
            }
        default:
            return res.status(400).json({ msn: "This method is not supported" });
    }
};