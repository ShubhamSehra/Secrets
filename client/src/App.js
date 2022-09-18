import "./App.css";
import Register from './components/Register';
import Login from './components/Login';
import Secret from './components/Secrets';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";



function App() {
  // const [loginStatus, setLoginStatus] = useState(false);

  
return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/register' element={<Register />}  />
      <Route path='/login' element={<Login />}  />
      <Route path = '/secret/:userId' element={ <Secret />  } />
     
      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <h1>there's nothing here</h1>
        </main>
      }
    />
    </Routes>

  </BrowserRouter>
  );
}

export default App;
