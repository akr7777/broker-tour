import './button-classes.scss'

type ButtonPropsType = {
    text: string,
    onClick: () => void,
}

export const ButtonOne = (props: ButtonPropsType) => {
    return (
        <button
            className='button-one-class'
            onClick={() => props.onClick()}
        >
            {props.text}
        </button>
    )
}