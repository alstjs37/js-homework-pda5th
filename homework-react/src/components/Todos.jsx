import axios from "axios";
import { useState, useEffect } from "react";

export default function Todos({userId}) {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const fetchTodos = async () => {
          if (userId) {
            const url = `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;
            const res = await axios.get(url);
            const data = res.data;

            setTodos(data);
          }
        };
    
        fetchTodos();
    }, [userId]);

    return (
        <div>
            <h2>Todos</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    )
}