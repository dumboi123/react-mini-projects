import { useState } from 'react';
import './App.css';
import AlertComponent from './Components/AlertComponent';
import NavigationBar from './Components/NavigationBar';
import PasswordGenerator from './Components/PasswordGenerator';
import TextUtility from './Components/TextUtility';
import { Route, Routes } from 'react-router-dom';
function App() {
  const [alert, setAlert] = useState(null)
  let showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(()=>{
      setAlert(null)
    },1500)
  }

  return (
    <div className="App">
      <NavigationBar />
      <AlertComponent alert={alert} />
      <Routes>
        <Route path='/' element={<TextUtility showAlert={showAlert} />} />
        <Route path='/passwordgenerator' element={<PasswordGenerator  showAlert={showAlert} />} />
      </Routes>
    </div>
  );
}

export default App;
