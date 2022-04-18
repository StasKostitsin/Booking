import React, { useEffect, useState } from 'react';
import { BookingApi } from '../api/booking.api';

interface ModalProps {
    visible: boolean
    onClose: () => void
}

const ReserveTicksModal = ({
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

    const addClick = async () => {
        const data = await BookingApi.addTicks(inputName, parseInt(inputLimit))
        if(data.message){
            setNameError(data.message);
            setSuccess('')
            return false;
        }
        setInputName('')
        setInputLimit('')
        setSuccess('Места забронированы')
    }
    
    const onCloseModal = () => {
        onClose()
        setSuccess('')
        setNameError('')
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

    return <div className="modal" onClick={onCloseModal}>
                <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                <h3 className="modal-title">Бронирование</h3>
                <span className="modal-close" onClick={onCloseModal}>
                &times;
                </span>
                </div>
                <div className="modal-body">
                <div className="modal-content">
                    {nameError && <div style={{color: 'red'}}>{nameError}</div>}
                    {success && <div style={{color: 'green'}}>{success}</div>}
                    <input type="text" name="name" value={inputName} placeholder="Имя" className="modal-content-input" onChange={e => onChangeModal(e)}/>
                    <input type="text" name="limit" value={inputLimit} placeholder="Кол-во мест" onChange={e => onChangeModal(e)}/>
                </div>
                </div>
                <div className='modal-footer'>
                    <button disabled={!inputName || !inputLimit} onClick={() => addClick()}>Бронировать</button>
                </div>
                </div>
            </div>
}




export default ReserveTicksModal