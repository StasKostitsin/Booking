import React, { useEffect, useState } from 'react';
import './App.css';
import { BookingApi } from './api/booking.api';
import ReserveTicksModal from './components/ReserveTicksModal';

function App() {
  const [ticks, setTicks] = useState([])
  const [isModalAdd, setModalAdd] = React.useState(false)
  const [isModalDel, setModalDel] = React.useState(false)
  const onClose = (opt: boolean) => {
    opt? setModalAdd(false) : setModalDel(false)
  } 
  const setModalReserve = (opt: boolean) => {
    opt? setModalAdd(true) : setModalDel(true)
  }

  const addClick = () => {

    BookingApi.addTicks("ss", 2)
  }

  const delClick = () => {
    BookingApi.delTicks("ss", 2)
  }

  const modalOptions = [
    {
      visible: isModalAdd, 
      title: "Бронирование", 
      content: <p>Количество мест</p>, 
      footer: <button onClick={() => addClick()}>Бронировать</button>,
      onClose: () => onClose(true)
    },
    {
      visible: isModalDel, 
      title: "Отмена", 
      content: <p>Количество мест</p>, 
      footer: <button onClick={() => delClick()}>Отменить</button>,
      onClose: () => onClose(false)
    }
  ]

  useEffect(() => {
    async function fetchAll(){
      const resp = await BookingApi.getCount();
      setTicks(resp);
    }
    fetchAll()
  }, [])
  


  return (
    <div className="App">
       <p>Количество свободных мест: {ticks}</p>    
       <button onClick={() => setModalReserve(true)} className="btn">Забронировать</button>
       <button onClick={() => setModalReserve(false)}>Отменить</button>
       {modalOptions.map(
         (item) => 
          <ReserveTicksModal 
            visible = {item.visible}
            title = {item.title}
            footer = {item.footer}
            onClose = {() => item.onClose()}
          />)}  
    </div>
  );
}

export default App;
