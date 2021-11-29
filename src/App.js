import './App.css';
import './MyComponents/Header';
import Header from './MyComponents/Header';
import { Footer } from './MyComponents/Footer';
import { Todos } from './MyComponents/Todos';
import React, { useState, useEffect } from 'react';
import { AddTodo } from './MyComponents/AddTodo';
import { About } from './MyComponents/About';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Signup } from './MyComponents/Signup';
import { Login } from './MyComponents/Login';
import { ForgeViewer } from './MyComponents/ForgeViewer';

function App() {

  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {

    console.log("I am on delete of todo", todo);

    setTodos(todos.filter((e) => {

      return e !== todo;
    }));

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {

    let sno;

    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }

    setTodos([...todos, myTodo]);
    console.log(myTodo);

    console.log("Adding a todo", title, desc);

  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <Router>
        <Header title="MyTodosList" searchBar={false} />

        <Switch>
          <Route exact path="/" render={
            () => {
              return (
                <>
                  <AddTodo addTodo={addTodo} />
                  <Todos todos={todos} onDelete={onDelete} />
                </>
              )

            }

          }>
          </Route>

          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/forgeviewer">
            <ForgeViewer />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
