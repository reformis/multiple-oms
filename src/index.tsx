import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import OMS1 from './OMS1';
import OMS2 from './OMS2';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from "react-router-dom";


const load = () => ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/oms1" element={<OMS1 />} />
        <Route path="/oms2" element={<OMS2 />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
)

function init() {
  if (window.fdc3) {
    load()
  } else {
    setTimeout(() => {
      console.log("loading")
      load()
      init()
    }, 500)
  }
}

init()



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
