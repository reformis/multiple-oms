import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BBAIM from './routes/BBAIM';
import CRD from './routes/CRD';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MUREX from './routes/MUREX';
import Combined from './routes/Combined';


const load = () => ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/BBAIM" element={<BBAIM />} />
        <Route path="/CRD" element={<CRD />} />
        <Route path="/MUREX" element={<MUREX />} />
        <Route path="/Combined" element={<Combined />} />
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
