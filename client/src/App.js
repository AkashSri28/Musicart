import './App.css';

import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Signup from './pages/Signup';
import ProductListing from './components/ProductListing'
import ProductDetails from './components/ProductDetails';
import Login from './pages/Login';
 // Import your Signup component

function App() {
  return (
      <Router>
        <div className="App">
          {/* Define your routes */}
          <Routes>
            <Route path="/" element={<ProductListing/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/product/:id" element={<ProductDetails/>} />
            
          </Routes>
        </div>
    </Router>
  );
}


export default App;
