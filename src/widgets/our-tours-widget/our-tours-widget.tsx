import './our-tour-classes.scss'

export type PropsType = {
    title: string,
    text: string,
    bgUrl: string
}


export const OurTourCaruselWidget = (props: PropsType) => {
    return (
        <>
        
        <div 
            className="our-tour-wrapper"
            style={{
                backgroundImage: 'url("' + props.bgUrl + '")',
            }}
        >
            <div className='our-tour-content-div'>
                <h3>{props.title}</h3>
                <div>{props.text}</div>
            </div>
            
        </div>
        </>

    )
}