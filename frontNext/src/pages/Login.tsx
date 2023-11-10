import { useState } from 'react';
import Login from '../components/Login'
import '../styles/Home.module.css'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <Login setIsAuthenticated={setIsAuthenticated} />
    </div>
  )
}
