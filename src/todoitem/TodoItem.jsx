import React, { useState } from 'react';
import css from "./todoitem.module.scss";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';

const TodoItem = ({ id, el }) => {
    const [rename, setRename] = useState('');
    const [isEdit, setEdit] = useState(false);
    const [status, setStatus] = useState('Сделано');
    /**
     * эта функция для обновления поля туду в коллекции todos мы просто заменяеи предыдущее значение
     * @param {*} e event в js
     */
    const updateTask = (e) => {
        setEdit(false)
        e.preventDefault()
        const taskDocument = doc(db, "todos", id.id);
        updateDoc(taskDocument, {
            todo: rename,
        });
        setRename('')
    }
    /**
     * берет id у элемента и удаляет его
     */
    const deleteTask = () => {
        const documentRef = doc(db, "todos", id.id);
        deleteDoc(documentRef)
    }
    /**
     * меняет статус карточки на done 
     * @param {*} e event в js
     */
    const chngeStatus = (e) => {
        setStatus('Сделано');
        setEdit(false)
        e.preventDefault()
        const taskDocument = doc(db, "todos", id.id);
        updateDoc(taskDocument, {
            status: status,
        });
        setRename('')
    }
    /**
     * нижестоящие переменные для получения дня месяца и года после мы их сравниваем с датой в карточке
     */
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    /**
     * функция для проверки цвета по дате 
     * @param {*} back он получает аргумент как цвет 
     * @returns возвращает цвет после сравения
     */
    const backSide = (back) => {
        if(el.time > currentDate){
            if (back === "High") {
                return 'rgb(224, 163, 163)'
            } else if (back === "Medium") {
                return 'rgb(63, 174, 218)'
            } else if (back === 'Low') {
                return 'rgb(115, 255, 115)'
            } else {
                return 'gray'
            }
        }
        return "gray"
    }
    return (
        <div key={id.id} className={css.item} style={{ background: `${backSide(el.status)}` }}>
            <div className={css.name}>
                <h1 className={css.todoName}>{el.todo}</h1>
                <div>
                    <h1>{el.status ? `Приоритет:${el.status}` : ""}</h1>
                    <h1>{el.time ? `DeadLine:${el.time}` : ""}</h1>
                </div>
            </div>
            {
                isEdit ? (
                    <div className={css.openEditor}>
                        <div><input type="text" placeholder='измени имя...' value={rename} onChange={(e) => setRename(e.target.value)} />
                            {
                                rename.length > "" ? <button onClick={(e) => updateTask(e)}>Изменить</button> : <button onClick={() => alert('Напиште что нибудь!')}>Изменить</button>
                            }
                        </div>
                        <button onClick={(e) => chngeStatus(e)} className={css.unActive}>убрать статус</button>
                    </div>
                ) : <div className={css.closeEditor}>
                    {
                        el.file.type === '' ? <h1></h1>
                            :
                            <>
                                <h1>Файл</h1>
                                <p>Тип:{el.file.type}</p>
                                <p>Размер:{el.file.size + 'kb'}</p></>
                    }
                </div>
            }
            <div className={css.btns}>
                <button onClick={() => setEdit(!isEdit)}>Настройки</button>
                <button onClick={deleteTask}>Удалить</button>
            </div>
        </div>
    )
}
export default TodoItem;
