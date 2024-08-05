// import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'
import './footer-styles.scss'

export const Footer = () => {
    const today:Date = new Date()
    const currentYear: number = today.getFullYear()

    return (
        // <WidgetWrapper>
        <footer className='footer-wrapper'>
            <div>
                @All right reserved, SRL Oldaga Group, {currentYear}
            </div>
            <div>
                {/* Designed by ... */}
            </div>
        </footer>
        // </WidgetWrapper>
    )
}