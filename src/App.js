import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';


import MainPage from './component/page/main_page';
import JobsfeedPage from './component/page/jobsfeed';
import WdListPage from "./component/page/wdlist";

import axios from "axios"

import { useRecoilState, useRecoilValue } from "recoil";
import { isLogin } from "./recoil/recoil";
import { Login_profile } from "./recoil/recoil";

function App() {
  const [Login_profiled, set_Login_profiled] = useRecoilState(Login_profile)
  const url = "https://prod.serverhwan.shop"
  const Login_profile_call = async() => {
    try{
      const data = await axios({
        method: "get",
        url: `${url}/users/${localStorage.getItem("userIdx")}`,
        headers: {
          useIdx: localStorage.getItem("userIdx"),
          "X-ACCESS-TOKEN" : localStorage.getItem("token")
        }
      })
      console.log(data.data.result);
      set_Login_profiled(data.data.result)
    }

    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      Login_profile_call();
    }
  }, [localStorage.getItem("token")])
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<MainPage />} />
        <Route path= '/jobsfeed' element = {<JobsfeedPage />} />
        <Route path="/wdlist" element = {<WdListPage />} />
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
