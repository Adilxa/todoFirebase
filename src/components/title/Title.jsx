import React, { useState } from 'react';
import SettingsModal from '../settingsModal/SettingsModal';
import css from "./title.module.scss";

export default function Title({ status, date, name, setStatus, setDate, setName, setFile, addTodo, isOpen, setIsOpen }) {
    const [isSelect, setIsSelect] = useState(false);
    /**
    * функция по условию будет показывать что надо ввести в поле какое нибудь значение
    */
    const addErrortodo = () => {
        alert('Введите что вы будете делать!')
    }
    return (
        <>
            <div className={css.title}>
                <div className={css.leftTitle}>
                    <span>
                        <input required type="text" value={name} placeholder='Напиши свою Туду..' onChange={(e) => setName(e.target.value)} />
                    </span>
                    <span>
                        <input type="file" accept='' onChange={(e) => setFile(e.target.files[0])} />
                        <img onClick={() => setIsOpen(!isOpen)} src="./images/settings.png" alt="" />
                    </span>
                </div>
                <div className={css.rightTitle}>
                    <button
                        className={name === '' ? css.notActiveBtn : css.activeBtn}
                        onClick={name === '' ? addErrortodo : addTodo}>
                        Создать
                    </button>
                </div>
            </div>
            {isOpen && <SettingsModal
                isSelect={isSelect}
                status={status}
                date={date}
                setDate={setDate}
                setIsSelect={setIsSelect}
                setStatus={setStatus}
            />}
        </>
    )
}
