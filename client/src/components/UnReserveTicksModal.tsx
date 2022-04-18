import React, { useEffect, useState } from 'react';
import { BookingApi } from '../api/booking.api';

interface ModalProps {
    visible: boolean
    onClose: () => void
}

const UnReserveTicksModal = ({
        visible = false,
        onClose,
    }: ModalProps) => {

    const [inputName, setInputName] = useState('');
    const [inputLimit, setInputLimit] = useState('');  
    const [nameError, setNameError] = useState(''); 
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setNameError('')
      }, [inputName, inputLimit])

    if (!visible) return null;

    const delClick = async () => {
        const data = await BookingApi.delTicks(inputName, parseInt(inputLimit))
        if(data.message){
            setNameError(data.message);
            setSuccess('')
            return false;
        }
        setInputName('')
        setInputLimit('')
        setSuccess('Бронь снята')
    } 

    const onChangeModal = (e: any) => {
        switch(e.target.name){
            case 'name':
                setInputName(e.target.value)
                break
            case 'limit':
                if(e.target.value < 0){
                    setNameError('Число мест не может быть меньше 0')
                    break
                }
                setInputLimit(e.target.value)
                break
        }
        setSuccess('')
    }

    const onCloseModal = () => {
        onClose()
        setSuccess('')
        setNameError('')
    }

    return <div className="modal" onClick={onCloseModal}>
                <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                <h3 className="modal-title">Отмена брони</h3>
                <span className="modal-close" onClick={onCloseModal}>
                &times;
                </span>
                </div>
                <div className="modal-body">
                <div className="modal-content">
                    {nameError && <div style={{color: 'red'}}>{nameError}</div>}
                    {success && <div style={{color: 'green'}}>{success}</div>}
                    <input type="text" name="name" value={inputName} placeholder="Имя" className="modal-content-input" onChange={onChangeModal}/>
                    <input type="text" name="limit" value={inputLimit} placeholder="Кол-во мест" onChange={onChangeModal}/>
                </div>
                </div>
                <div className='modal-footer'>
                    <button disabled={!inputName || !inputLimit} onClick={() => delClick()}>Отменить бронь</button>
                </div>
                </div>
            </div>
}




export default UnReserveTicksModal