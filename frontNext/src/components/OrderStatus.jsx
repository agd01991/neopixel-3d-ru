import React, { useState } from 'react';
import axios from 'axios';

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');

  const handleOrderIdChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Отправляем запрос на изменение статуса заказа
      await axios.put(`/api/orders/${orderId}/status`, { status });
      console.log('Статус заказа успешно изменен');
      
      // Очищаем поля формы
      setOrderId('');
      setStatus('');
    } catch (error) {
      console.error('Ошибка при изменении статуса заказа:', error);
    }
  };

  return (
    <div>
      <h2>Изменить статус заказа</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Идентификатор заказа:</label>
          <input type="text" value={orderId} onChange={handleOrderIdChange} />
        </div>
        <div>
          <label>Новый статус:</label>
          <input type="text" value={status} onChange={handleStatusChange} />
        </div>
        <button type="submit">Изменить статус</button>
      </form>
    </div>
  );
};

export default OrderStatus;
