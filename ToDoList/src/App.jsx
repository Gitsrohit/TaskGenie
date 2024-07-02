import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  


  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    < >
    {/* <Navbar/>  */}
    <section className='bg-back min-h-[100vh]'>
    <h1 className='font-bold  md:text-6xl text-3xl text-violet-50 text-center p-4'>~TaskGenie~</h1>
       <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-white/15 z-10 backdrop-filter backdrop-blur-[15px] min-h-[80vh] md:w-[35%] shadow-2xl">
        <h1 className='font-bold text-center text-3xl text-violet-200'>TaskGenie - <span className='text-violet-400'>Manage your todos at one place!</span></h1>
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold text-violet-100'>Add a Todo</h2>
          <div className="flex">

          <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 text-violet-950' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
         </div>
         <input className='my-4 text' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2 text-white' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-violet-50 opacity-15 w-[90%] mx-auto my-2'></div>
         <h2 className='text-2xl font-bold text-violet-50'>Your Todos</h2>
         <div className="todos">
          {todos.length ===0 && <div className='m-5 text-white'>No Todos to display🫣</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between text-violet-50"}>
            <div className='flex gap-5'> 
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-pink-600 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
            </div> 
          </div>
          })}
         </div>
        
       </div>
       </section>
    </>
  )
}

export default App