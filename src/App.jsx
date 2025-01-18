
import Home from './component/home'
import ItemDetails from './component/itemDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itemDetails/:id" element={<ItemDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

