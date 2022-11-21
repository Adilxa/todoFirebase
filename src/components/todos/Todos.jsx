import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import TodoItem from '../../todoitem/TodoItem';

export default function Todos() {
    const [todo, setTodos] = useState([]);
    /**
     * useEffect здесь для получения данных с коллекции
     */
    useEffect(() => {
        db.collection('todos')
            .orderBy('time', 'desc')
            .onSnapshot(snapshot => {
                setTodos(snapshot.docs.map(doc => ({
                    id: doc.id,
                    item: doc.data()
                })))
            })
    }, [])
    return (
        <div>
            {todo.map((el) => (
                <TodoItem el={el.item} id={el} />
            ))}
        </div>
    )
}
