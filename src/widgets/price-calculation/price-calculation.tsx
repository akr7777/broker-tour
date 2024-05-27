import { useEffect, useState } from 'react'

import manBlack from '../../assets/icons/temp/man-black.png'
import manGreen from '../../assets/icons/temp/man-green.png'
import plus from '../../assets/icons/temp/plus.png'
import plusDis from '../../assets/icons/temp/plus-dis.png'
import minus from '../../assets/icons/temp/minus.png'
import minusDis from '../../assets/icons/temp/minus-dis.png'

import './price-calc-classes.scss'
import uuid from 'react-uuid'

type CaseType = {
    count: number,
    setCount: (count: number) => void
    maxCount: number
}
const Case1 = (props: CaseType) => {

    const range1 = []
    for (let i=1; i<=props.maxCount; i++) {
        range1.push(<option value={i} key={uuid()}>{i}</option>)
    }

    return (
        <div className='price-calculation-form'>
                <h4>Вариант №1</h4>
                <select 
                    className='price-calculation-select-list' 
                    onChange={(e) => props.setCount(Number(e.currentTarget.value))}
                    value={props.count}

                    // {...range1.map(o => o)}
                >
                    {range1.map(o => o)}
                    {/* <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option> */}
                </select>
            </div>
    )
}

const Case3 = (props: CaseType) => {

    const isMin: boolean = props.count === 1
    const isMax: boolean = props.count === props.maxCount

    const minusImg = isMin ? minusDis : minus
    const plusImg = isMax ? plusDis : plus

    const minusF = () => {
        if (!isMin) {
            props.setCount(props.count - 1)
        }
    }

    const plusF = () => {
        if (!isMax) {
            props.setCount(props.count + 1)
        }
    }

    return (
        <div className='price-calculation-form'>
                <h4>Вариант №3</h4>
                {/* <label>(Тут разные иконки + и -, т.к. я не стал тратить время на то, чтобы найти одинаковые по стилю, сорри)</label> */}
                <div className='r1'>
                    <img alt='' src={minusImg} onClick={minusF}/>
                    <h4>{props.count}</h4>
                    <img alt='' src={plusImg} onClick={plusF}/>
                </div>
                {isMax && <label>Достигнуто макс кол-во человек в рамках этого тура</label>}
            </div>
    )
}


export const PriceCalculation = () => {
    const [count, setCount] = useState<number>(1)
    // const [childrenCount, setChildrenCount] = useState<number>(0)
    const maxCount = 3

    const [manList, setManList] = useState<Array<string>>([manBlack, manBlack, manBlack])
    useEffect(() => {
        const newArr: string[] = []
        for (let i=1; i<=maxCount; i++) {
            if (i<=count) {
                newArr.push(manGreen)
            } else {
                newArr.push(manBlack)
            }
        }
        setManList(newArr)
    }, [count])
    


    return (
        <div className='price-calculation-wrapper'>
            <h2>Выберите кол-во человек для экскурсии:</h2>
            <label>минимум: 1, максимум: {maxCount}</label>
            <h2>Выбрано: {count}</h2>
            {/* <div className='r1'>
                <h2>{count}</h2>
            </div> */}


            {/* Case 1 */}
            <Case1 count={count} setCount={setCount} maxCount={maxCount}/>


            {/* Case 2 */}
            <div className='price-calculation-form'>
                <h4>Вариант №2</h4>
                <div className='r1'>
                    {/* <div className='selectlist'> */}
                        {manList.map((m, i: number) => {
                            return <img key={uuid()} alt='' src={m} onClick={() => setCount(i+1)}/>
                        })}
                    {/* </div> */}
                </div>
            </div>

            
            {/* Case 3 */}
            <Case3 count={count} maxCount={maxCount} setCount={setCount}/>

        </div>
    )
}