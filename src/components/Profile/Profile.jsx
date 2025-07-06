import React from 'react'
import { useState } from 'react';
import Search from '../Search/Search';
//import { useNavigate } from 'react-router-dom'; // Para redirigir después de buscar

const Profile = () => {

   const [text, setText] = useState("");
   //const navigate = useNavigate(); // Hook para redirigir después de buscar

    const handleSearch = (e) => {
    setText(e.target.value);
    if (e.key == "Enter") {
      // console.log(text);
      navigate("/search/" + text);
    }
  };
  return (
    <>
      <Search/>
      <div>
        <input onKeyUp={handleSearch} placeholder="search posts or users " type="text" name="text" />
      </div>
    </>
  )
}

export default Profile