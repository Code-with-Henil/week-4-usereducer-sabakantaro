import React, { useReducer, useState } from 'react'

function TodoList() {
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, {
          id: state.length -1,
          task: action.task
        }]
      case 'toggle':
        return state.map((item, index) => {
          if (index === action.index) {
            return {
              ...item,
              isComplete: !item.isComplete
            }
          } else {
            return item
          }
        })
      case 'remove':
        return state.filter((_, index) => index !== action.index)
      case 'clear':
        return []
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(todoReducer, [
    {
      id: 0,
      task: 'Learn Angular.js',
      isComplete: false
    }
  ])
  const [task, setTask] = useState('')

  const handleAdd = (e) => {
    if (task === '') {
      return
    }
    e.preventDefault()
    dispatch({
      type: 'add',
      task
    })
    setTask('')
  }

  const handleToggle = (index) => {
    dispatch({
      type: 'toggle',
      index
    })
  }

  const handleRemove = (index) => {
    dispatch({
      type: 'remove',
      index
    })
  }

  const handleClear = () => {
    dispatch({
      type: 'clear'
    })
  }

  return (
    <div className='container mx-auto px-4 py-8 bg-gray-100 rounded-md mt-5'>
      <h1 className='text-center text-4xl font-bold mb-4'>Todo List</h1>
      <form className='mb-4 flex' onSubmit={handleAdd}>
        <input
          className='mr-4 border border-gray-400 px-2 py-1 rounded'
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </form>
      <button className='mr-4 bg-teal-400 rounded-md text-white px-2 py-1' onClick={handleAdd}>Add</button>
      <button className='mr-4 bg-red-400 rounded-md text-white px-2 py-1' onClick={handleClear}>Clear</button>
      <ul className='text-lg text-gray-700 mt-3'>
        {state.map((item, index) => (
          <li className='bg-gray-200 rounded-md px-2 py-1 mb-2 flex items-center' key={item.id}>
            <input type="checkbox" className='mr-4' checked={item.isComplete} onChange={() => handleToggle(index)} />
            <p className={`text-lg w-full ${item.isComplete ? 'line-through text-gray-400' : ''}`}>{item.task}</p>
            <button className='ml-4' onClick={() => handleRemove(index)}>
              <div className='bg-white font-bold rounded-md px-2 py-0'>x
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList