import { 
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from "../api/apiSlice";
import { useState } from "react";
import { FaTrash,FaUpload } from "react-icons/fa";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()

    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo({ userId: 1, title: 'newTodo', completed: false })
        setNewTodo('')
    }

    const newItemSection = <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo" className="text-2xl tracking-widest font-bold text-slate-600">Enter a new todo item</label>
        <div className="new-todo mt-8">
            <input 
                type="text" 
                id="new-todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter new Todo"
                className="p-2 bg-slate-200"
            />
        </div>
        <div>
            <button className="submit">
                <FaUpload />
            </button>
        </div>
    </form>

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if(isSuccess) {
        content = todos.map(todo => {
            return (
                <article key={todo.id}>
                    <div className="todo">
                        <input 
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <div>
                        <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
                            <FaTrash />
                        </button>
                    </div>
                </article>
            )
        })
    } else if(isError) {
        content = <p>{error}</p>
    }

    return (
        <main className="flex justify-center mt-20">
            <div>
                <h1 className="text-3xl font-bold">Todo List</h1>
                <div className="bg-white drop-shadow-md p-4 mt-10 rounded-md">
                    {newItemSection}
                    {content}
                </div>
            </div>
        </main>
    )
}

export default TodoList