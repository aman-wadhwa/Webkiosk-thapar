import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Input from "./components/Input";
import { UserProvider } from "./Reducers/UserContext";
import Home from './components/Home';
import Notfound from './pages/Notfound';
import Semester from './components/Semester';
import Marks from './components/Marks';
function App() {
  
 


  return (
    
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Input/>}/>
          <Route path='/:roll' element={<Home/>}/>
          <Route path='/:roll/:sem' element={<Semester/>}/>
          <Route path='/:roll/:sem/:code' element={<Marks/>}/>
          <Route path='/notfound' element={<Notfound/>}/>
          <Route path='/*' element={<Notfound/>}/>
        </Routes>
      
      </Router>
    </UserProvider>
  )
}

export default App;
