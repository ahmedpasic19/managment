import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Login,
  Register,
  HomePage,
  AllTasks,
  AssignTasks,
  EmployeeTasks,
} from './pages/pages'
import Layout from './components/routes/Layout'
import Navbar from './components/layout/Navbar'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Auth routes */}
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          {/* Page routes */}
          <Route path='/'>
            <Route path='homepage' element={<HomePage />} />
            <Route path='my-tasks' element={<EmployeeTasks />} />
            <Route path='tasks' element={<AllTasks />} />
          </Route>
          {/* Requre permission */}
          <Route path='/'>
            <Route path='employees' element={<AssignTasks />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
