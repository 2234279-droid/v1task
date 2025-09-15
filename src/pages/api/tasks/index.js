import { dbConnect } from "@/src/utils/mongoose";

dbConnect()

export default function handler(req, res) {
  res.status(200).json("Tasks");
}
