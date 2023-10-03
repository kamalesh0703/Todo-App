import React, { Component } from "react";
import { AddTodo, DeleteTodo,EditTodo,TodoComplete } from "../Services/TodoService";
export default class TodoApplication extends Component {
    constructor() {
        super()
        this.state = {
            formdata: {
                name: "",
                title: "",
                description: ""
            },
            TodoList: [],
            isEdit: true
        }
        this.getTodoList = this.getTodoList.bind(this)
    }
    handleToggle = () => {
        this.setState({ isEdit: false })
    }
    componentDidUpdate = () => {
        this.getTodoList()
    }
    componentDidMount=()=>{
        this.getTodoList()
    }
    getTodoList = async () => {
        let resp = await fetch("https://todo-app-1w5y.onrender.com/todo/getTodo")
        let result = await resp.json()
        this.setState({ TodoList: result })
        this.setState({ isEdit: true })
    }
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            formdata: { ...this.state.formdata, [name]: value }
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.state.isEdit ? this.addTodo() : this.editTodo()
    }
    addTodo = async () => {
        AddTodo(this.state.formdata)
        this.formEmpty()
        this.getTodoList()
    }
    handleDelete = async (id) => {
        DeleteTodo(id)
        this.getTodoList()
    }
    handleEdit = (Todo) => {
        this.setState({
            formdata: Todo
        })
        this.handleToggle()
    }
    editTodo = async () => {
        let reqObj = {...this.state.formdata,status:"Todo"}
        EditTodo(reqObj)
        this.getTodoList()
        this.formEmpty()
    }
    formEmpty = () => {
        this.setState({
            formdata: { name: "", description: "", title: "" }
        })
    }
    handleComplete=async(Todo)=>{
        TodoComplete(Todo)
        this.getTodoList()
    }
    render() {
        return (
            <>
                <h1 id="title">Todo App</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div id="inputfirst">
                                <label>Name</label>
                                <input type="text"
                                    name="name"
                                    value={this.state.formdata.name}
                                    onChange={this.handleChange} />
                            </div>
                            <div id="inputthird">
                                <label>Title</label>
                                <input type="text"
                                    name="title"
                                    value={this.state.formdata.title}
                                    onChange={this.handleChange} />
                            </div>
                            <div id="inputsecond">
                                <label>Description</label>
                                <input type="text"
                                    name="description"
                                    value={this.state.formdata.description}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                        <button type="submit" onSubmit={this.handleSubmit} id="addtodo">{this.state.isEdit ? 'Add Todo' : 'ReEdit'}</button>
                    </div>
                </form>
                <div id="list-container">
                    {
                        this.state.TodoList.map((Todo, index) => {
                            return (
                                <>
                                    <li key={Todo._id} className="todolist">
                                        <div className="name-container">
                                            <h3 style={{textDecoration:(Todo.status==="Complete")?"line-through":"none",color:(Todo.status==="Complete")?"gray":"#fe9901"}}>{Todo.name}</h3>
                                            <h5 style={{textDecoration:(Todo.status==="Complete")?"line-through":"none",color:(Todo.status==="Complete")?"gray":"#ffff"}}>{Todo.title}</h5>
                                            <p style={{textDecoration:(Todo.status==="Complete")?"line-through":"none",color:(Todo.status==="Complete")?"gray":"#FFFf"}}>{Todo.description}</p>
                                        </div>
                                        <div className="btn-container">
                                            <button id="complete" onClick={()=>{this.handleComplete(Todo)}} style={{display:(Todo.status==="Todo")?"":"none"}}>Complete</button>
                                            <button id="edit" onClick={() => this.handleEdit(Todo)} style={{display:(Todo.status=== "Complete")? "none":""}}>Edit</button>
                                            <button id="delete" onClick={() => this.handleDelete(Todo._id)}>Delete</button>
                                        </div>
                                    </li>
                                </>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}