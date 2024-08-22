import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo, addTodo } from '../features/todo/todoSlice';

function Todos() {
    const todos = useSelector(state => state.todo.todos);
    const dispatch = useDispatch();
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editText, setEditText] = useState('');
    const inputRef = useRef(null); // Ref for the input field

    // Load todos from local storage on component mount
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            // Check if any of the stored todos are not already in Redux state
            storedTodos.forEach(todo => {
                if (!todos.some(existingTodo => existingTodo.id === todo.id)) {
                    dispatch(addTodo(todo.text));
                }
            });
        }
    }, [dispatch]);

    // Save todos to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleEdit = (todo) => {
        if (!todo.completed) { // Only allow editing if the todo is not completed
            setEditingTodoId(todo.id);
            setEditText(todo.text);
        }
    };

    const handleSave = () => {
        dispatch(updateTodo({ id: editingTodoId, text: editText }));
        setEditingTodoId(null);
        setEditText('');
    };

    const handleRemove = (id) => {
        dispatch(removeTodo(id)); // Remove from Redux state
    };

    // Focus input field when editing
    useEffect(() => {
        if (editingTodoId) {
            inputRef.current.focus();
        }
    }, [editingTodoId]);

    return (
        <>
            <div className="bg-zinc-700 rounded-md px-4 mt-6 text-2xl inline-block text-white"
            >Todos
            </div>
            <ul className='list-none'>
                {todos.map((todo) => (
                    <li
                        className={`mt-4 flex justify-between items-center px-4 py-2 rounded ${todo.completed ? 'bg-gray-800' : 'bg-zinc-800'} ${todo.completed ? 'text-white line-through' : 'text-white'}`}
                        key={todo.id}
                    >
                        <div className='flex items-center'>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => dispatch(updateTodo({ id: todo.id, text: todo.text, completed: !todo.completed }))}
                                disabled={editingTodoId !== null && editingTodoId === todo.id} // Disable checkbox when in edit mode
                                className={`mr-2 ${todo.completed ? 'bg-gray-600' : ''}`} // Change background color when checked
                            />
                            {editingTodoId === todo.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    ref={inputRef} // Set ref to input field
                                    className='bg-zinc-800 text-white border-0 focus:outline-none w-full'
                                />
                            ) : (
                                <div className='w-full text-left'>{todo.text}</div>
                            )}
                        </div>
                        <div className='flex space-x-2'>
                            {editingTodoId === todo.id ? (
                                <button onClick={handleSave} className='text-white bg-green-500 border-0 py-1 px-2 focus:outline-none hover:bg-green-600 rounded'>
                                    📁
                                </button>
                            ) : (
                                <button onClick={() => handleEdit(todo)} className='text-white bg-blue-500 border-0 py-1 px-2 focus:outline-none hover:bg-blue-600 rounded' disabled={todo.completed}>
                                    ✏️
                                </button>
                            )}
                            <button
                                onClick={() => handleRemove(todo.id)} // Use handleRemove function
                                className='text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todos;
