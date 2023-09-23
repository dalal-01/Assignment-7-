import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect } from "react";





const App = () => {
  const [toDoItemInput, setToDoItemInput] = useState("");
  const [updateToDoItem, setUpdateToDoItem] = useState("")
  const [selectedItemId, setSelectedItemId] = useState("")
  const [open, setOpen] = useState(false);


  const [toDoList, setToDoList] = useState([
    { id: uuidv4(), name: "Learn useEffect Hook", isdone: false },
    { id: uuidv4(), name: "clean", isdone: true }

  ]);

  function handelAddClick() {
    const updateditem = [
      ...toDoList, { id: uuidv4(), name: toDoItemInput }
    ]
    setToDoList(updateditem)
    localStorage.setItem("ToDoList", JSON.stringify(updateditem))
  }

  function handelDeleteClick(id) {
    const newList = toDoList.filter((t) => {
      if (t.id == id) return false
      else
        return true
    })
    setToDoList(newList)
    localStorage.setItem("ToDoList", JSON.stringify(newList))
  }

  function handelEditClick(id) {
    setOpen(true)
    setSelectedItemId(id)
  }

  function handleClose() {
    setOpen(false)
    setUpdateToDoItem("")
  }

  function handleUpdateClick() {
    const updateToDo = toDoList.map((item) => {
      if (item.id == selectedItemId)
        return { ...item, name: updateToDoItem }
      else
        return item
    })
    setToDoList(updateToDo)
    localStorage.setItem("ToDoList", JSON.stringify(updateToDo))
    handleClose()
  }

  function handleIsDone(id) {
    const updatedToDo = toDoList.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      } else {
        return item;
      }
    });
    setToDoList(updatedToDo);
    localStorage.setItem("ToDoList", JSON.stringify(updatedToDo));
  }


 useEffect(() => {
    if(localStorage.length==0)
    localStorage.setItem("ToDoList", JSON.stringify(toDoList));
else
    {const storageToDoList = JSON.parse(localStorage.getItem("ToDoList"));
    setToDoList(storageToDoList)}
  }, []);


  return (
    <div className="todo-container">
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>

      <input
        className="add-task "
        type="text"
        placeholder="Add new task ..."
        onChange={(e) => setToDoItemInput(e.target.value)}
      />
      <button type="submit" className="add-button" onClick={handelAddClick}>
        Add
      </button>


      {
        toDoList.map((t) => {
          return (
            <div key={t.id} className="todo">
              <div className="todo-text">
                <input className="checkbox" type="checkbox" id="isCompleted" checked={t.isDone}
                  onChange={() => handleIsDone(t.id)} />
              </div>
              <div>{t.name}</div>

              <div className="todo-actions">
                <button className="submit-edits" onClick={() => { handelEditClick(t.id) }}>Edit</button>
                <button className="submit-edits" onClick={() => { handelDeleteClick(t.id) }}>Delete</button>
              </div>
            </div>
          )

        })
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the Item, please enter the new name below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="ItemName"
            label="New Item Name"
            type="text"
            fullWidth
            value={updateToDoItem}
            onChange={(event) => setUpdateToDoItem(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateClick}>Update</Button>
        </DialogActions>
      </Dialog>



    </div>
  );
};
export default App;
