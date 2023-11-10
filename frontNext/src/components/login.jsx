import { useState } from "react";
import Link from "next/link";
export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/employees/getrole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.role === "Admin") {
        localStorage.setItem("isAuthenticated", "true"); // Сохранить флаг аутентификации в localStorage
        setIsAuthenticated(true); // Установить флаг аутентификации в состоянии
        setError(""); // Сбросить ошибку входа
      } else {
        setError("Недостаточно прав доступа");
      }
    } else {
      setError(data.message); // Установить ошибку входа в случае неуспешного входа
    }
  };

  return (
    <div className="bg-[#171616] py-[50px] laptop:py-[100px] flex flex-col justify-center items-center min-h-screen">
      <div className="text-white flex mx-auto p-[10px] justify-center laptop:max-w-7xl laptop:mb-[140px]">
      
        <div className="text-lg text-white font-HelveticaNeueCyr font-semibold text-center mb-2 laptop:text-5xl">
          АВТОРИЗАЦИЯ
        </div>
      </div>
      <form className="mx-4">
        <div className="grid grid-cols-1 gap-4 font-inter">
          <div className="form-group mb-6">
            <input
              type="email"
              className="w-full form-control pl-[20px] laptop:h-[75px] text-xl font-normal text-gray-700 bg-[#1E1F21] bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-white focus:bg-[#1E1F21] focus:border-blue-600 focus:outline-none"
              id="exampleInput8"
              placeholder="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="password"
              className="w-full form-control pl-[20px] laptop:h-[75px] text-xl font-normal text-gray-700 bg-[#1E1F21] bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-white focus:bg-[#1E1F21] focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="text-white">{error}</div>}
        <button
          type="submit"
          className="w-full h-[50px] laptop:h-[75px] bg-[#26AAE1] text-white font-medium text-lg leading-tight uppercase rounded-full shadow-md hover:bg-[#26AAE1] hover:shadow-lg focus:bg-[#26AAE1] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#26AAE1]active:shadow-lg transition duration-150 ease-in-out mb-6 shadow-2xl shadow-[#0D5675B2]"
          onClick={handleSubmit}
        >
          Войти
        </button>
        <Link href="/" className="text-blue-500">Главная</Link> 
      </form>
    </div>
  );
}
