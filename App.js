import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './Componants/Navbar';
import Signup from './Componants/Signup/Signup';
import Login from './Componants/Login/Login';
import Home from './Componants/Pages/Home';
import CompleteProfile from './Componants/Pages/CompleteProfile';
import ForgetPassword from './Componants/Pages/ForgetPassword';
import ExpenseForm from './Componants/Pages/ExpenseForm';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/CompleteProfile' element={<CompleteProfile/>}></Route>
      <Route path='/ForgetPassword' element={<ForgetPassword/>}></Route>
      <Route path='/ExpenseDetails' element={<ExpenseForm/>}></Route>
     
      </Routes>
    </Router>
  );
}

export default App;
