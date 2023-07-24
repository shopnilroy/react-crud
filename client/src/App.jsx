
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <div >
      <Header></Header>
      {/* <Navbar></Navbar> */}
      <Outlet></Outlet>
     
    </div>
  )
}

export default App
