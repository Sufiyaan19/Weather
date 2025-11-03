import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos')
      const data = await response.json()
      setTodos(data.todos || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  // Add new todo
  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      })
      const data = await response.json()
      if (data.success) {
        setTodos([...todos, data.todo])
        setNewTodo('')
      }
    } catch (error) {
      console.error('Error adding todo:', error)
    } finally {
      setLoading(false)
    }
  }

  // Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
      })
      const data = await response.json()
      if (data.success) {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        ))
      }
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (data.success) {
        setTodos(todos.filter(todo => todo._id !== id))
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>MERN To-Do App</h1>
        <p>Built with React, Vite, Express, MongoDB</p>
      </header>

      <main className="app-main">
        <form onSubmit={addTodo} className="add-todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="todo-input"
          />
          <button type="submit" disabled={loading} className="add-btn">
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </form>

        <div className="todos-container">
          {todos.length === 0 ? (
            <p className="no-todos">No todos yet. Add one above!</p>
          ) : (
            <ul className="todos-list">
              {todos.map((todo) => (
                <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo._id)}
                    className="todo-checkbox"
                  />
                  <span className="todo-text">{todo.title}</span>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
