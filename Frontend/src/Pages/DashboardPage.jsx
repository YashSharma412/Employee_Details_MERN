import React from 'react'
import axios from 'axios';
import BASE_URL from '../URL/BASE_URL';

const DashboardPage = () => {
  async function handleTest(){
    try{
      const response = await axios(`${BASE_URL}/api/test1`);
      console.log(response.data)
    } catch(e){
      console.log(e.response)
    }
  }
  return (
    <div>
      <button onClick={handleTest}></button>
    </div>
  )
}

export default DashboardPage