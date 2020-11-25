import React,{useState,useEffect} from 'react'
import './App.css';
import axios from 'axios' 



function App() {
    const initialTask={
        id:null,
        title:"",
        is_done: false
    }
    const [tasks,setTasks]=useState([])
    const [task,setTask]=useState(initialTask)
    const [updateOrCreate,setUpdateOrCreate]=useState(false)
    const [fetch,setFetch]=useState(false)
    const done =(task)=>{
         return (task.is_done)?"fa fa-check-circle fa-2x text-success":"fa fa-check-circle fa-2x"
    }
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasklist/')
        .then(
            response=>{
                
                setTasks(response.data)
                console.log('fetched data ...')
            }
        )
        .catch(
            console.log("error")

        )

    },[fetch])
    
    const handlechange=(e)=>{
       setTask({...task,
               title:e.target.value,
               
            })
        console.log('handle change:'+ task)
    }

    const handleSubmit=(e)=>{
     e.preventDefault()
     axios.post('http://127.0.0.1:8000/api/task-create/',task);
     setTask(initialTask)
    setFetch(!fetch)

    }
     
    const handleToUpdate=(task)=>{
        setTask(task)
        setUpdateOrCreate(true)
    }

    const handleUpdate=(e)=>{
        e.preventDefault()
         console.log(task)
         axios.post('http://127.0.0.1:8000/api/task-update/'+task.id,
         {
            title:task.title,
            is_done:task.is_done
         });
         setUpdateOrCreate(false)
         setTask(initialTask)
         setFetch(!fetch)

    }

    const handleDelete=(task)=>{
        axios.delete('http://127.0.0.1:8000/api/task-delete/'+task);
        setFetch(!fetch)
    }
    
    const handleComplete=(task)=>{
        axios.post('http://127.0.0.1:8000/api/task-update/'+task.id,
        {
           title:task.title,
           is_done:true
        });
        setFetch(!fetch)
    }

  return (
    
     <div className="list-container col-md-6">
        <div className="form-container">
           <form className="form-group" onSubmit={e=>(updateOrCreate)?handleUpdate(e):handleSubmit(e) }>
             <input type="text" className="form-control mr-1" onChange={e=>handlechange(e)} value={task.title} id="titleInput" placeholder="add task..."/>
             <button className="btn btn-success">submit</button>
          </form>
        </div>
       
       
        <div className="tasks-container">

            
        {tasks.map((task,index)=>( 
            <div className="task" key={index}>
                <div style={{flex:20}}>{task.title}</div>
           
               <div className="d-flex" style={{flex:3}}>
                  <button className="btn btn-default mr-1" onClick={()=>handleComplete(task)}><i className={done(task)}></i></button>
        <button  className="btn btn-default mr-1" onClick={()=>handleToUpdate(task)}  ><i className="fa fa-edit fa-2x"></i></button>
                   <button className="btn btn-default" onClick={()=>handleDelete(task.id)}><i className="fa fa-minus fa-2x"></i></button>
              </div>
             
            </div>
        ))}

        </div>

         


      </div>
       
  );
}

export default App;
