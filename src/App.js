import React, {useState, useEffect} from 'react';
import List from "./components/List";
import Alert from './components/Alert';

const getLocalStorage = () => {
    let list  = localStorage.getItem("list")
    if(list){
        return (JSON.parse(localStorage.getItem("list")));
    }else{
        return []
    }
};

const  App = ()  => {
    const [name, setName] = useState(" ");
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIdEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [alert, setAlert] = useState({show: false, msg: " ",   type: " "});

    useEffect(()=>{
        localStorage.setItem("list", JSON.stringify(list));
    }, [list])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name){
            showAlert(true, "danger", "Please enter value");
        }else if (name && isEditing){
            setList(
                list.map((item) => {
                    if (item.id === editId){
                        return {...item, title: name}
                    }
                    return item
                })
            );
            setName("")
            setEditId(null)
            setIdEditing(false)
            showAlert(true, "success", "Edited successfully ")
        }else{
            showAlert(true, "success", "Task added to List")
            const newItem = {id: new Date().getTime().toString(), title:name};
            setList([...list, newItem]);
            setName(" ")
        }
    };

    const showAlert = (show=false, type = " ", msg = " ") => {
        setAlert({show, type, msg});
    }
    const removeItem = (id) => {
        showAlert(true, "danger", "Task removed")
        setList(list.filter((item) => item.id !== id));
    };
    const editItem = (id) => {
        const editItem = list.find((item) => item.id === id)
        setIdEditing(true)
        setEditId(id)
        setName(editItem.title)
    }
    const clearList = () => {
        showAlert(true, "danger", "Panel cleared")
        setList([])
    }

    return (
      <section className="section-center">
          <form onSubmit={handleSubmit}>
              {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
              <h3 style={{ marginBottom: "1.5rem", textAlign: "center"}}>
                  ToDo List
              </h3>
              <div className="mb-3 form">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter todo"
                    onChange={(e)=> setName(e.target.value)}
                    value={name}
                  />
                  <button className="btn btn-success" type="submit">
                      {isEditing ? "Edit" : "Submit"}
                  </button>
              </div>
          </form>
          {list.length > 0 && (
              <div style={{marginTop: "2rem"}}>
                  <List items={list} removeItem={removeItem} editItem={editItem}/>
                  <div className="text-center">
                      <button className="btn btn-primary" onClick={clearList}>
                          Clear Items
                      </button>
                  </div>
              </div>
          )}
      </section>
  );
}

export default App;
