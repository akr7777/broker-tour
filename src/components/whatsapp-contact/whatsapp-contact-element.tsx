import { motion } from "framer-motion"
import { CONTACTS, HOVER_VALUE } from "../../store/consts"

import whatsappImg from '../../assets/icons/social-networks/whatsapp.svg'

import './whatsapp-contact-element.scss'

export const WhatsappContactElement = () => {
    return (
        <a href={'https://wa.me/' + CONTACTS.phoneOlga}>
            <motion.img 
                whileHover={{ scale: HOVER_VALUE, rotate: 360 }}
                src={whatsappImg}
                alt=""
                className="whatsapp-contact-element-img-class"
            />
        </a>
    )
}