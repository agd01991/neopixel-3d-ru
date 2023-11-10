import { useState } from "react";
import NavBarAdmin from "../components/UI/navbar/NavBarAdmin";
import Login from "../components/Login";
import "../styles/Home.module.css";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div>
      <NavBarAdmin />
      <div className="bg-[#1E1F21] laptop:py-[150px] p-[30px]"></div>
    </div>
  );
}
