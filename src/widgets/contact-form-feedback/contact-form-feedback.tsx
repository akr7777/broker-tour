import { useState } from "react"
import { LineTextField, MultilineTextField } from "../../components/text-fields/line-text-filed"
import axios from "axios";
import { toast } from 'react-toastify';

import { ReqBodyType } from "../../api/api";
import { ButtonOne } from "../../components/buttons/button1";
import { useTranslation } from "react-i18next";
// import { WidgetWrapper } from "../../shared/widget-wrapper/widget-wrapper";

import './contact-form-classes.scss'

export const ContactFeedbackForm = () => {

    const {t} = useTranslation()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')


    const onNameChange = (v: string) => setName(v)
    const onEmailChange = (v: string) => setEmail(v)
    const onPhoneChange = (v: string) => setPhone(v)
    const onTitleChange = (v: string) => setTitle(v)
    const onContextChange = (v: string) => setContent(v)

    const onSendBtnClick = () => {

        const url: string = import.meta.env.VITE_SERVER_URL + '/contact_form'

        const data: ReqBodyType = {
            name: name,
            email: email,
            phone: phone,
            title: title,
            content: content,
            origin: import.meta.env.VITE_WEB_SITE_URL
        }

        axios.get(import.meta.env.VITE_SERVER_URL)

        axios
            .post(url, data)
            .then((response) => {
                console.log('res=', response)
                toast.success('Ваше сообщение отправлено.')
                // console.log(response.data);
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config);
              })
            .catch(() => {
                toast.error('Error')
            });
    }

    return (
        // <WidgetWrapper>
        <div className="contact-form-wrapper">

            <h2>{ t("contact_us") }</h2>

            <div className="contact-form-field-div">
                <label>{ t('contact_form.name') }</label>
                <LineTextField text={name} onTextChange={(v: string) => onNameChange(v)}/>
            </div>

            <div className="contact-form-field-div">
                <label>{ t('contact_form.email') }</label>
                <LineTextField text={email} onTextChange={(v: string) => onEmailChange(v)}/>
            </div>

            <div className="contact-form-field-div">
                <label>{ t('contact_form.phone') }</label>
                <LineTextField text={phone} onTextChange={(v: string) => onPhoneChange(v)}/>
            </div>

            <div className="contact-form-field-div">
                <label>{ t('contact_form.title') }</label>
                <LineTextField text={title} onTextChange={(v: string) => onTitleChange(v)}/>
            </div>

            <div className="contact-form-field-div">
                <label>{ t('contact_form.context') }</label>
                <MultilineTextField text={content} onTextChange={(v: string) => onContextChange(v)}/>
            </div>

            <ButtonOne onClick={onSendBtnClick} text={ t('contact_form.button_text') }/>

        </div>
        // </WidgetWrapper>
    )
}