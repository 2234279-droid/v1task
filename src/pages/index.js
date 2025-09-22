import {Button, Card, Container, Grid} from 'semantic-ui-react';

export default function HomePage({tasks}) {
  if (tasks.length === 0)
    return(
      <Grid centered verticalAlign="middle" columns="1" style={{height: "80vh"}}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks yet</h1>
            <img src="https://cdn-icons-png.flaticon.com/128/17134/17134571.png" alt="No task yet"></img>
            <div>
              <Button primary>Create task</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>)
  return (
    <Container>
      <Card.Group itemsPerRow={5}>
        {tasks.map(task =>(
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button primary>View Task</Button>
              <Button secundary>Edit Task</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();
  
  return {
    props: {
      tasks,
    },
  };
};