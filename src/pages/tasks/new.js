import { Form, Grid, Button} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TaskFormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description:  ""});

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const {query, push} = useRouter();

  const validate = () => {
    const errors = {};

    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is requeired";

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    await createTask();
    await push('/');
  };

    const createTask = async () => {
      try {
        await fetch("http://localhost:3000/api/tasks", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(newTask)
        });
      } catch (error) {
          console.error(error);
      }
  };

const handleChange = (e) => setNewTask({...newTask, [e.target.name]: e.target.value});

const getTask = async () => { 
  const res = await fetch("http://localhost:3000/api/tasks/" + query.id);
  const data = await res.json();
  console.log(data);
};

useEffect(() => {
    if (query.id) getTask();
    }, []); 

  return (
    <Grid
    centered verticalAlign="middle"
    columns="3"
    style={{height: "80vh"}}>
      <Grid.Row> 
        <Grid.Column textAlign="center">
          <h1>Create Task</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
            label="Title"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            error = {errors.title ? {content: errors.title, pointing: "below"} : null }
            />
            <Form.TextArea
            label="Description"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            error = {errors.description ? {content: errors.description, pointing: "below"} : null }
            />
            <Button>Save</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
