import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router-dom";
import router from './routes/Routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    
      <div className=''>
        <RouterProvider router={router} />
      </div>
      
  
   
    
  </React.StrictMode>,
)
