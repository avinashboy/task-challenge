import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import faker from "faker"
import React, {useRef, useState} from "react"

function App() {
const myRef = useRef(null)
  
  const deleteItem = (e) =>{
    const name =  e.target.id
    const newArr = arr.filter(r => r !== name)
    setArr(arr => [...newArr])
  }

  const [taskName, setTaskName] = useState("")
  const [arr, setArr] = useState(['Create theme'])
  const createArray = ()=>{
    setArr(arr => [...arr, faker.name.findName()])
  }

  const clickMe = (e)=>{
    e.target.parentNode.parentNode.parentNode.classList.toggle('complete')
  }

  const hideTask = (name)=>{
    console.log('name:', name)
    
    if(name === "all"){
      myRef.current.classList.remove("only-complete")
      myRef.current.classList.remove("only-active")
    }

    if(name === "active"){
      myRef.current.classList.remove("only-complete")
      myRef.current.classList.add("only-active")
    }

    if(name === "completed"){
      myRef.current.classList.add("only-complete")
      myRef.current.classList.remove("only-active")
    }

  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-white'>
            <div className='card-body'>
              <form onSubmit={(e) =>{
                e.preventDefault();
                setArr(arr => [...arr, taskName])
                setTaskName("")
              } }>
                <input
                  type='text'
                  name="task"
                  className='form-control add-task'
                  placeholder='New Task...'
                  value={taskName}
                  onChange={(e)=> setTaskName(e.target.value)}
                />
                
              </form>
              <button className="btn btn-primary mt-2" onClick={createArray}>Add</button>
              <ul className='nav nav-pills todo-nav'>
                <li role='presentation' className='nav-item all-task active' onClick={()=>hideTask("all")}>
                  <span className='nav-link' >
                    All
                  </span>
                </li>
                <li role='presentation' className='nav-item active-task'>
                  <span className='nav-link' onClick={()=>hideTask("active")}>
                    Active
                  </span>
                </li>
                <li role='presentation' className='nav-item completed-task'>
                  <span className='nav-link' onClick={()=>hideTask("completed")}>
                    Completed
                  </span>
                </li>
              </ul>
              <div className='todo-list' ref={myRef}>
                {
                  arr.map((element, key)=>(console.log('element:', element),
                    <div className='todo-item' key={key} >
                  <div className='checker'>
                    <span className=''>
                      <input type='checkbox' onClick={clickMe} />
                    </span>
                  </div>
                  &nbsp;
                  <span>{element}</span>
                  &nbsp;
                    <i className="fas fa-trash remove-todo-item" onClick={deleteItem} id={element}></i>
                </div>
                  ))
                }
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default App;
