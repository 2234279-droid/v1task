import { Form, Grid, Button} from 'semantic-ui-react';
import {useState} from 'react';

export default function TaskFormPage() {
  const [newTask, serNewTask] = useState({title: "", description:""});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviando formulario");
  }

  const handleChange = (e) => setNewTask({[e.target.name]: e.target.value});

  return (
    <Grid centered verticalAlign="middle" columns="3" style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>Create Task</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
            label="Title"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            />
            <Form.TextArea
            label="Description"
            placeholder="Description
            name="description"
            onChange={handleChange}
            />
            <Button>Save</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
