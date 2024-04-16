// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';  // Certifique-se que o caminho está correto

const Sidebar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="w-64 h-full shadow-md bg-white absolute">
      <div className="p-5 text-xl font-semibold border-b">Menu</div>
      <ul className="flex flex-col p-4">
       
        
        {user ? (
          <>
           <li className="mb-2">
              <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">Home</Link>
            </li>
            <li className="mb-2">
              <Link to="/cadastroProduto" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">Cadastrar Produtos</Link>
            </li>
            <li className="mb-2">
              <button onClick={() => auth.signOut()} className="text-gray-600 hover:text-gray-800 transition-colors duration-200">Logout</button>
            </li>
            <li className="mb-2">
              <Link to="/gestaoProdutos" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">Gestão de Produtos</Link>
            </li>
            
          </>
        ) : (
          <li className="mb-2">
            <Link to="/login" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">Login</Link>
          </li>
          
          
        )}
        <li className="mb-2">
          <Link to="/cadastro" className="text-gray-600 hover:text-gray-800 transition-colors duration-200">Criar uma conta</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
