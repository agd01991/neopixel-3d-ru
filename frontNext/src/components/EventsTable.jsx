import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EventTable() {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:3000/api/events')
      .then((response) => {
        setEvents(response.data.events);
        console.log(response);
      })
      .catch((error) => {
        console.error('Failed to fetch events:', error);
      });
  };

  const deleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:3000/api/events/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
        console.log(response);
      })
      .catch((error) => {
        console.error('Failed to delete event:', error);
      });
  };

  const editEventClick = (event) => {
    setEditEvent(event);
  };

  const updateEvent = () => {
    axios
      .put(`http://localhost:3000/api/events/${editEvent.id}`, editEvent)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event.id === editEvent.id ? editEvent : event))
        );
        setEditEvent(null);
        console.log(response);
      })
      .catch((error) => {
        console.error('Failed to update event:', error);
      });
  };

  const filterEvents = (events) => {
    return events.filter((event) => {
      const searchLower = searchValue.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.date.toLowerCase().includes(searchLower) ||
        event.img.toLowerCase().includes(searchLower)
      );
    });
  };

  const sortEvents = (events) => {
    const sortedEvents = [...events];
    switch (sortBy) {
      case "id":
        sortedEvents.sort((a, b) => a.id - b.id);
        break;
      case "date":
        sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        return events;
    }

    if (sortOrder === "desc") {
      sortedEvents.reverse();
    }

    return sortedEvents;
  };

  const itemsPerPage = 10;
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const filteredEvents = filterEvents(events);
  const sortedEvents = sortEvents(filteredEvents);
  const paginatedEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    const maxPage = Math.ceil(sortedEvents.length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <div>
          <label htmlFor="search">Поиск: </label>
          <input
            id="search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sort">Сортировка: </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Без сортировки</option>
            <option value="id">ID</option>
            <option value="date">Дата</option>
          </select>
          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "⬆" : "⬇"}
          </button>
        </div>
        <div className='flex justify-between  items-center'>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} / {Math.ceil(sortedEvents.length / itemsPerPage)}</span>
          <button onClick={goToNextPage} disabled={currentPage === Math.ceil(sortedEvents.length / itemsPerPage)}>
            Next
          </button>
        </div>
        <table className="table-auto border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">ID</th>
              <th className="border border-slate-300">Title</th>
              <th className="border border-slate-300">Description</th>
              <th className="border border-slate-300">Date</th>
              <th className="border border-slate-300">Img</th>
              <th className="border border-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents.map((event) =>
              editEvent !== null && editEvent.id === event.id ? (
                <tr key={editEvent.id}>
                  <td className="border border-slate-300">{editEvent.id}</td>
                  <td className="border border-slate-300">
                    <input
                      type="text"
                      value={editEvent.title}
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, title: e.target.value })
                      }
                    />
                  </td>
                  <td className="border border-slate-300">
                    <input
                      type="text"
                      value={editEvent.description}
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, description: e.target.value })
                      }
                    />
                  </td>
                  <td className="border border-slate-300">
                    <input
                      type="text"
                      value={editEvent.date}
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, date: e.target.value })
                      }
                    />
                  </td>
                  <td className="border border-slate-300">
                    <input
                      type="text"
                      value={editEvent.img}
                      onChange={(e) =>
                        setEditEvent({ ...editEvent, img: e.target.value })
                      }
                    />
                  </td>
                  <td className="border border-slate-300">
                    <button onClick={updateEvent}>Save</button>
                    <button onClick={() => setEditEvent(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={event.id}>
                  <td className="border border-slate-300">{event.id}</td>
                  <td className="border border-slate-300">{event.title}</td>
                  <td className="border border-slate-300">{event.description}</td>
                  <td className="border border-slate-300">{event.date}</td>
                  <td className="border border-slate-300">{event.img}</td>
                  <td className="border border-slate-300">
                    <button onClick={() => deleteEvent(event.id)}>Delete</button>
                    <button onClick={() => editEventClick(event)}>Edit</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
