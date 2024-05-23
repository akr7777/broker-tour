import uuid from 'react-uuid'
import './todo-1.scss'

const content: Array<string> = [
    'ХОЧЕШЬ В КОСТА-РИКУ?',
    'НЕ ОТКЛАДЫВАЙ!',
    'Просто отправь запрос на поездку мечты!'
]

export const ToDoAction1 = () => {
    return (
        <div className="todo-action-1-wrapper">
            {content.map(p => <h2 key={uuid()}>{p}</h2>)}
        </div>
    )
}