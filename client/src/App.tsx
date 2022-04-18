import React, { useEffect, useState } from 'react';
import './App.css';
import { BookingApi } from './api/booking.api';
import ReserveTicksModal from './components/ReserveTicksModal';
import UnReserveTicksModal from './components/unReserveTicksModal';


function App() {
  const [ticks, setTicks] = useState([])
  const [isModalAdd, setModalAdd] = useState(false)
  const [isModalDel, setModalDel] = useState(false)
  const [adminArr, setAdminArr] = useState('')
  const onCloseAdd = () => setModalAdd(false) 
  const onCloseDel = () => setModalDel(false)

 

  useEffect(() => {
    async function fetchAll(){
      const resp = await BookingApi.getCount()
      setTicks(resp)
    }
    fetchAll()
  }, [isModalAdd, isModalDel])
  
  const adminReq = async () => {
    const data = await BookingApi.adminReq()
    const res = JSON.stringify(data, null, 2)
    setAdminArr(res)
  }

  return (
    <div className="App">
       <p>Количество свободных мест: {ticks}</p>    
       <button onClick={() => setModalAdd(true)} className="btn">Бронировать</button>
       <button onClick={() => setModalDel(true)} className="btn">Отменить бронь</button>
       <button onClick={() => adminReq()}>Админ запрос</button>
       <pre>{adminArr}</pre>
       <ReserveTicksModal 
          visible = {isModalAdd}
          onClose = {onCloseAdd}
        />
        <UnReserveTicksModal 
          visible = {isModalDel}
          onClose = {onCloseDel}
        />
    </div>
  );
}

export default App;
