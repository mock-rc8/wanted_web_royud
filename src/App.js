import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';


import MainPage from './component/page/main_page';
import JobsfeedPage from './component/page/jobsfeed';
import WdListPage from "./component/page/wdlist";
import MyWantedPage from "./component/page/mywanted";
import ProfilePage from "./component/page/profile";
import CommunityPage from "./component/page/communityPage";
import WdPage from "./component/page/wd";
import BookmarksPage from "./component/page/bookmarks";

import axios from "axios"

import { useRecoilState, useRecoilValue } from "recoil";
import { isLogin, Login_profile } from "./recoil/recoil";

function App() {
  const [isLogined, set_isLogined] = useRecoilState(isLogin);
  const [Login_profiled, set_Login_profiled] = useRecoilState(Login_profile)

  // 로그인 시 프로필 이미지 가져오기

  const url = "https://prod.serverhwan.shop"

  const Login_profile_call = async() => {
    try{
      const data = await axios({
        method: "get",
        url: `${url}/users/${localStorage.getItem("userIdx")}`,
        headers: {
          userIdx: localStorage.getItem("userIdx"),
          "X-ACCESS-TOKEN" : localStorage.getItem("token")
        }
      })
      set_Login_profiled(data.data.result)
    }

    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    if(isLogined){
      Login_profile_call();
    }
  }, [isLogined])

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<MainPage />} />
        <Route path= '/jobsfeed' element = {<JobsfeedPage />} />
        <Route path="/wdlist" element = {<WdListPage />} />
        <Route path="/mywanted" element = {<MyWantedPage />} />
        <Route path="/profile" element = {<ProfilePage />} />
        <Route path="/community" element = {<CommunityPage />} />
        <Route path="/wd/:idx" element = {<WdPage />} />
        <Route path= "/bookmarks" element = {<BookmarksPage />} />
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
