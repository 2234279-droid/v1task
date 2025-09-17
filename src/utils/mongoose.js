import {connect, connection} from 'mongoose'

const conn = {
    isconnected: false
}

export async function dbConnect(){ //Conexion a BD con variable a .env
    if (conn.isconnected) return; //Previene multiples conexiones
    
    const db = await connect(process.env.MONGODB_URL) //Conexion a MongoDB
    conn.isconnected = db.connections[0].readyState; //Estado de la conexion

    console.log(db.connection.db.databaseName)
}

connection.on("connected", () => { //Aviso de conexion con MongoDB
    console.log("MongoDB is connected");
});

connection.on("Error", (err) => {
    console.log(err);
});