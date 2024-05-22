import * as React from 'react';
import Navbar from './admin/Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  React.useEffect(() => {
    if (user) {
      if (user.message !== "User Not Found") {
        navigate('/DashBaord')
      }
    }
  }, [user, navigate])
  return (
    <>
      <Navbar />
    </>
  );
}