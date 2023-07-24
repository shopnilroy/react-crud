import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Main from "../Layout/Main";
import Add from "../pages/Add/Add";
import Update from "../pages/Update/Update";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/add",
        element: <Add></Add>
      },
      {
        path: "/update/:id",
        element: <Update></Update>,
        loader: (({ params }) => fetch(`http://localhost:5000/update/${params.id}`))
      },

      
    ]


  },
  

]);

export default router;