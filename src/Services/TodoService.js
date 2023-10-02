export function AddTodo(payload){
    let reqObj = {...payload,status:"Todo"}
    console.log(reqObj)
    fetch('https://todo-app-1w5y.onrender.com/todo/addTodo', {
            method: 'POST',
            body: JSON.stringify(reqObj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {return json});
}

export async function DeleteTodo (id){
    let header = {
        method: "DELETE"
    }
    let resp = await fetch(`https://todo-app-1w5y.onrender.com/todo/delete/${id}`, header)
    let result = await resp.json({Status:"Delete Successfullly!"})
    return result;
}
export async function EditTodo(reqObj){
    let headers = {
        method: "PUT",
        body: JSON.stringify(reqObj),
        headers: {
            'content-type': 'application/json'
        }
    }
    let id=reqObj._id
    fetch(`https://todo-app-1w5y.onrender.com/todo/update/${id}`, headers)
}

export async function TodoComplete(contact){
    let reqObj = {...contact,status:"Complete"}
    console.log(reqObj)
    let headers = {
        method: "PUT",
        body: JSON.stringify(reqObj),
        headers: {
            'content-type': 'application/json'
        }
    }
    fetch(`https://todo-app-1w5y.onrender.com/todo/complete/${contact._id}`, headers)
}
