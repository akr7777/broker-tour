import './button-classes.scss'

type ButtonPropsType = {
    text: string,
    onClick: () => void,
    disabled?: boolean,
}

export const ButtonOne = (props: ButtonPropsType) => {
    return (
        <button
            className='button-one-class'
            onClick={() => props.onClick()}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    )
}