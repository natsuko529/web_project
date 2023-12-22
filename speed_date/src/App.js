import './App.css';
import UserHeader from './components/header/user_header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginWindow from './components/login/login';
import RegistrationWindow from './components/registration/registration';
import UserPage from './components/user_page/user_page';
import Events from './components/events/events';
import UserList from './components/user_list/user_list';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <LoginWindow/> */}
        {/* <RegistrationWindow/> */}
        <UserHeader />
        <Routes>
          {/* <Route path='/' element={<LoginWindow/>}/> */}
          <Route path='/registration' element={<RegistrationWindow />} />
          <Route path='/user_page' element={<UserPage />} />
          <Route path='/login' element={<LoginWindow />} />
          <Route path='/events' element={<Events />} />
          <Route path='/users' element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
