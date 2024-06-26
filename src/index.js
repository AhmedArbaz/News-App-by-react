import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'; 
import Layout from './Layout';
import News from './Components/News';

let apiKey = process.env.REACT_APP_NEWS_API

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>  {/* yaha bhi path aur element danay ho gay */}
     <Route exact path='' element={<News apiKey={apiKey} key="general" pageSize={6} country="us" category="general"/>}/> {/* yaha self closing kar lo  */}
     <Route exact path='business' element={<News apiKey={apiKey} key="business" pageSize={6} country="us" category="business"/>}/>
     <Route exact path='technology' element={<News apiKey={apiKey} key="technology" pageSize={6} country="us" category="technology"/>}/>
     <Route exact path='sports' element={<News apiKey={apiKey} key="sports" pageSize={6} country="us" category="sports"/>}/>
     <Route exact path='science' element={<News apiKey={apiKey} key="science" pageSize={6} country="us" category="science"/>}/>
     <Route exact path='health' element={<News apiKey={apiKey} key="health" pageSize={6} country="us" category="health"/>}/>
     <Route exact path='entertainment' element={<News apiKey={apiKey} key="entertainment" pageSize={6} country="us" category="entertainment"/>}/>

    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
