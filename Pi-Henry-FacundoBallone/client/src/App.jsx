import {Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import Landing from "./Views/Landing/Landing"
import Detail from "./Views/Detail/Detail";
import Home from './Views/Home/Home';
import Form from './Views/Form/Form';

function App() {

  
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />}/>
        <Route exact path='/home' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/form' element={<Form/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
