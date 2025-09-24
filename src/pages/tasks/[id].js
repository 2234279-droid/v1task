import Error from "next/error";
import { Grid, Button } from "semantic-ui-react";

export default function TaskDetalil({task, error}){
    if (error && error.statusCode)
        return <Error statusCode={error.statusCode} title={error.statusText} />;

    return(
        <Grid centered verticalAlign="middle" columns="1" style={{height: "80vh"}}>
            <Grid.Row>
                <Grid.Column>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <div>
                        <button color="red">Delete</button>
                        <button color="blue">Edit</button>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export async function getServerSideProps( { query: {id} }){
    //console.log(id);

    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

    if (res.status === 200){
        const task = await res.json();
        return {
            props: {
                task,
            },
        };
    }
    return{
        props:{
            error: {
                starusCode: res.status,
                starusText: "Invalid id",
            },
        },
    };
}