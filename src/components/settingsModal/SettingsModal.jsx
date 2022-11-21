import React from 'react';
import css from "./settings.module.scss";

export default function SettingsModal({
    isSelect,
    status,
    date,
    setDate,
    setIsSelect,
    setStatus }) {
    return (
        <div className={css.content}>
            <div className={css.date}>
                <p>Добавить Дату</p>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className={css.leftItem}>
                <div className={css.select} onClick={() => setIsSelect(!isSelect)}>
                    <p>Открыть</p>
                    <img src="./images/arrowBottom.png" alt="" />
                </div>
                {isSelect && <div className={css.status}>
                    <p className={status === 'High' ? css.active : ""} onClick={() => setStatus('High')}>High</p>
                    <p className={status === 'Medium' ? css.active : ""} onClick={() => setStatus('Medium')}>Medium</p>
                    <p className={status ==='Low' ? css.active : ""} onClick={() => setStatus('Low')}>Low</p>
                </div>}
            </div>
        </div>
    )
}
