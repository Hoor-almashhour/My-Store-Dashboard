import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth.tsx'
import Login from './pages/LogIn.tsx'
import SignUp from './pages/SignUp .tsx'
import Root from './pages/Root.tsx'
import Items from './pages/Items.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Favorites from './pages/Favorites.tsx'
import Orders from './pages/Orders.tsx'
import CreateItems from './pages/CreateItems.tsx'
import ListItems from './pages/ListItems.tsx'
import EditItem from './pages/EditItem.tsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element : <Auth />,
    children :[
      {
        path : "",
        element : <Login />
      },
      {
        path : "signup",
        element : <SignUp />
      }
    ]
  },
  {
    path : "/dashboard" ,
    element : <Root /> ,
    children : [
      {
        path : "items" ,
        element : <Items />,
        children :[
          {
            path : "" ,
            element : <ListItems />,
          },
          {
          path : "Create" ,
          element : <CreateItems />
          } ,
          {
          path : "edit/:id" ,
          element : <EditItem/>
        },
        ]
      } ,
      {
        path : "favorites" ,
        element : <Favorites/>
      },
      {
        path : "orders" ,
        element : <Orders/>
      }
      
    ]
  } 
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
    <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="bg-green-100 text-green-800 font-medium px-4 py-3 rounded shadow flex items-center gap-2"
      />
    </>
    
  </StrictMode>,
)
