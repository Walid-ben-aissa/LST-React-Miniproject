import "./App.css";
import { Card, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import {
  Check2,
  Trash,
  PlusCircleDotted,
  Question,
} from "react-bootstrap-icons";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const [donecards, setDoneCards] = useState([]); //The tasks that are done
  const [notcards, setnotCards] = useState([]); //The tasks that are still TODO
  const [update, forceUpdate] = useState(true); //A state variable that i used to force rerender
  useEffect(() => {
    //Getting the list of Tasks using an API rest
    fetch("http://localhost:3030/getall").then((res) => {
      res.json().then((data) => {
        //Setting the Done tasks in Cards,each with to buttons, toggle done and delete task
        setDoneCards(
          data.map((e) => {
            return (
              !e["complete"] && (
                <Card className="todo" text="light">
                  <Card.Body>
                    <h2>{e["task"]}</h2>
                    <Button
                      variant="success"
                      onClick={() => {
                        fetch("http://localhost:3030/toggle/" + e["id"]);
                        forceUpdate(!update);
                      }}
                    >
                      <Check2 />
                    </Button>
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => {
                        fetch("http://localhost:3030/deltask/" + e["id"]);
                        forceUpdate(!update);
                      }}
                    >
                      <Trash />
                    </Button>
                  </Card.Body>
                </Card>
              )
            );
          })
        );
        //Setting the TO DO tasks in Cards,same structure as done tasks
        setnotCards(
          data.map((e) => {
            return (
              e["complete"] && (
                <Card className="todo" text="light">
                  <Card.Body>
                    <h2>{e["task"]}</h2>
                    <Button
                      variant="warning"
                      onClick={() => {
                        fetch("http://localhost:3030/toggle/" + e["id"]);
                        forceUpdate(!update);
                      }}
                    >
                      <Question />
                    </Button>
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => {
                        fetch("http://localhost:3030/deltask/" + e["id"]);
                        forceUpdate(!update);
                      }}
                    >
                      <Trash />
                    </Button>
                  </Card.Body>
                </Card>
              )
            );
          })
        );
      });
    });
  }, [update]);
  /*I set the update variable, so that useEffect only retriggers when
  the update variable is changed, otherwise this would cause an
  infinite rerender loop.*/
  ///////Function that adds a task
  const add = (e) => {
    e.preventDefault();
    let task = document.getElementById("tasktoadd").value;
    let body = `{"task":"${task}","complete":false}`;
    task !== ""
      ? fetch("http://localhost:3030/addtask/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        }).then((res) => res.json().then((data) => forceUpdate(!update)))
      : alert("Can't add an empty task");
  };
  return (
    <div className="App">
      <Card id="addcrd" text="light">
        <Form onSubmit={add}>
          <Card.Title>
            <Form.Label>
              <h1>Add a task!</h1>
            </Form.Label>
          </Card.Title>
          <InputGroup size="lg" className="mb-3">
            <Form.Control type="text" id="tasktoadd" />
            <Button variant="success" onClick={add}>
              <PlusCircleDotted size="32"></PlusCircleDotted>
            </Button>
          </InputGroup>
        </Form>
      </Card>
      <h1 className="title">To DO</h1>
      {donecards}
      <h1 className="title">Done</h1>
      {notcards}
    </div>
  );
}

export default App;
