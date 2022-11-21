import './App.css';
import Title from './components/title/Title';
import Todos from './components/todos/Todos';
import { useState } from "react"
import { db } from '../src/firebase';

function App() {
  /**
   * состояния для получения данных с полей
   */
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('')
  const [file, setFile] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  /**
   * функция создает новый объект и сразу же добовляет его в нашу Collection Todos
   * @param {*} e event в js 
   */
  const addTodo = (e) => {
    e.preventDefault()
    try {
      db.collection('todos').add({
        todo: name,
        time: date,
        status: status,
        file: {
          type: file.type > "" ? file.type : "" ,
          size: file.size > "" ? file.size : ""
        },
      })
      setName('');
      setIsOpen(false);
      setStatus('');
      setDate('')
      setFile('initial')
    } catch (err) {
      alert(err)
    }
  }
  return (
    <div className='main'>
      <Title
        isOpen={isOpen}
        status={status}
        date={date}
        name={name}
        file={file}
        setIsOpen={setIsOpen}
        setStatus={setStatus}
        setDate={setDate}
        setName={setName}
        setFile={setFile}
        addTodo={addTodo}
      />
      <Todos />
    </div>
  );
}

export default App;
