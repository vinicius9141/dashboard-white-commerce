// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components 
import Sidebar from './components/Sidebar';
import Welcome from './components/Welcome';
import Login from './components/Login';
import ProductForm from './components/ProductForm';
import Singnup from './components/Singnup';
import ProductManagement from './components/ProductManagement';

function App() {
  return (
    <Router>
      <div className="flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <Sidebar />
        <div className="flex-1 p-10 ml-64">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastroProduto" element={<ProductForm />} />
            <Route path='/cadastro' element={<Singnup />} />
            <Route path='/gestaoProdutos'element={<ProductManagement/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
