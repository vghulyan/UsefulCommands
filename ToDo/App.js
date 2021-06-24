import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const App = (props) => {
    const textInput = useRef(null);
    const myRef = useRef(null);
    const [tasks, setTasks] = useState(props.tasks);
    const [editFlag, setEditFlag] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        textInput.current.focus();
    }, [textInput])
  // add
  const saveTodo = e => {
      e.preventDefault();
      const newTask = {id: "todo-" + tasks.length, name: textInput.current.value, completed: false};
      setTasks([...tasks, newTask]);

      console.log('VALUE:', textInput.current.value, tasks);
  }
  // remove
  // update
    const editToDo2 = task => {
        console.log(task);
        const updatedTask = tasks.map(t => {
            if(task.id === t.id) {
               return {...task, completed: !t.completed}
            }
            return task;
        });
        setTasks(updatedTask);
    }
    const editToDo = task => {
        console.log(task);
        //setCurrentTask(task);
        setEditFlag(true);
        setCurrentTask(task);
    }
    const updateToDo = (task, newVal) => {
        console.log('UPDATE TODO: ', task, newVal, myRef.current);
        // const editTask = {...task, name: newVal}
        // setTasks(editTask);
    }
  // delete
    const deleteToDo = task => {
        const remainingTasks = tasks.filter(t => task.id !== t.id)
        setTasks(remainingTasks);
        console.log(task, tasks);
    }

    const completedToDo = task => {
        console.log('completed: ', task.id, task.completed);
    }
  return (
      <div>
          <input type="text" ref={textInput} placeholder='Add Todo...' />
          <input type="button" className='button blueButton' value="Save" onClick={(e) => saveTodo(e)} />

          {
              tasks.map(m => {
                  return (
                      <div className='card' key={m.id}>
                          {
                              editFlag ? <input type="text" value={m.name} onChange={() => updateToDo(m)} ref={myRef.current}/>
                                  : <h6>{m.name}</h6>
                          }

                        <input type="button" value="Edit" onClick={(e) => editToDo(m)} className='button whiteButton'  />
                        <input type="button" value="Delete" onClick={(e) => deleteToDo(m)} className='button redButton'  />
                          <input type="button" value="Completed" onClick={(e) => completedToDo(m)} className='button whiteButton'  />
                      </div>
                  )
              })
          }
      </div>
  )
}

export default App;
