import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./Pages/Header/Header";
import Dashboard from './Pages/Dashboard/Dashboard';
import Nomatch from './Pages/Nomatch/Nomatch';
import PostUser from './Pages/Employee/PostUser';
import UpdateUser from './Pages/Employee/UpdateUser';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='*' element={<Nomatch/>} />
        <Route path='/employee' element={<PostUser/>} />
        <Route path='/employee/:id' element={<UpdateUser/>} />
      </Routes>
    </>
  );
}

export default App;
