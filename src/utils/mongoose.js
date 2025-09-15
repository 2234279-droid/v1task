import {connect, connection} from 'mongoose'

export async function dbConnect(){ // Conexion a BD con variable a .env
    const db = await connect(process.env.MONGODB_URL)

    console.log(db.connections[0].readyState);
}

connection.on("connected", () => {
    console.log("MongoDB is connected");
});

connection.on("Error", (err) => {
    console.log(err);
});