import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DashBoard from './Components/DashBoard/DashBoard';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Profile from './Components/Profile/Profile';
import SignUP from './Components/SignUP/SignUP';
import AuthProvider from './Context/AuthProvider';




function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>}/>
          <Route path="/signup" element={<SignUP></SignUP>}/>
          
          <Route path="/dashboard" element={<PrivateRoute><DashBoard></DashBoard></PrivateRoute> }/>
          <Route path="/" element={<PrivateRoute><DashBoard></DashBoard></PrivateRoute>}>
          <Route path="/users/:email" element={<Profile></Profile>}/>
          </Route>
        </Routes>
        </BrowserRouter>
      </AuthProvider>
      
    </div>
  );
}

export default App;
