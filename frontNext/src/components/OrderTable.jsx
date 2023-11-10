import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/orders")
      .then((result) => {
        setOrders(result.data.orders);
        console.log(result);
      });
  }, []);

  const handleStatusChange = (orderId, status) => {
    axios.put(`http://localhost:3000/api/orders/${orderId}`, { status })
      .then((result) => {
        console.log(result);
        // Update the order status in the local state
        const updatedOrders = orders.map(order => {
          if (order.id === orderId) {
            return {
              ...order,
              status: status
            };
          }
          return order;
        });
        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sortOrders = (orders) => {
    const sortedOrders = [...orders];
    switch (sortValue) {
      case "id":
        sortedOrders.sort((a, b) => a.id - b.id);
        break;
      case "status":
        sortedOrders.sort((a, b) => {
          const statusOrder = ["ожидание", "в работе", "готов"];
          const statusA = statusOrder.indexOf(a.status);
          const statusB = statusOrder.indexOf(b.status);
          return statusA - statusB;
        });
        break;
      case "date":
        sortedOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        return orders;
    }

    if (sortOrder === "desc") {
      sortedOrders.reverse();
    }

    return sortedOrders;
  };

  const handleSortChange = (event) => {
    const selectedSortValue = event.target.value;
    if (selectedSortValue === sortValue) {
      // If the same sort value is selected, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different sort value is selected, reset the sort order to ascending
      setSortOrder("asc");
    }
    setSortValue(selectedSortValue);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterOrders = (orders) => {
    return orders.filter(order => {
      const searchLower = searchValue.toLowerCase();
      return (
        order.name.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower) ||
        order.tel.toLowerCase().includes(searchLower)
      );
    });
  };

  if (orders.length === 0) {
    return <div>Нет доступных заказов.</div>;
  }

  const filteredOrders = filterOrders(orders);
  const sortedOrders = sortOrders(filteredOrders);

  return (
    <div   className="flex justify-center items-center"  >
      <div className="w-full max-w-4xl">
      <h2>Заказы</h2>
      <div>
        <label htmlFor="search">Поиск: </label>
        <input
          id="search"
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <label htmlFor="sort">Сортировка: </label>
        <select
          id="sort"
          value={sortValue}
          onChange={handleSortChange}
        >
          <option value="">Без сортировки</option>
          <option value="id">ID</option>
          <option value="status">Статус</option>
          <option value="date">Дата</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "⬆" : "⬇"}
        </button>
      </div>
      <table className="table-auto border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-300">ID</th>
            <th className="border border-slate-300">Email</th>
            <th className="border border-slate-300">Имя</th>
            <th className="border border-slate-300">Телефон</th>
            <th className="border border-slate-300">Название принтера</th>
            <th className="border border-slate-300">Описание</th>
            <th className="border border-slate-300">Дата</th>
            <th className="border border-slate-300">Статус</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order, index) => (
            <tr key={index}>
              <td className="border border-slate-300">{order.id}</td>
              <td className="border border-slate-300">{order.email}</td>
              <td className="border border-slate-300">{order.name}</td>
              <td className="border border-slate-300">{order.tel}</td>
              <td className="border border-slate-300">{order.printername}</td>
              <td className="border border-slate-300">{order.description}</td>
              <td className="border border-slate-300">{order.date}</td>
              <td className="border border-slate-300">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="ожидание">Ожидание</option>
                  <option value="в работе">В работе</option>
                  <option value="готов">Готов</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
