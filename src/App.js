import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';


import MainPage from './component/page/main_page';
import JobsfeedPage from './component/page/jobsfeed';



function App() {

  return (
    <div className="App">'
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<MainPage />} />
        <Route path= '/jobsfeed' element = {<JobsfeedPage />} />
      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
