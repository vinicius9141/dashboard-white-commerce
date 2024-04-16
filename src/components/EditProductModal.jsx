// src/components/EditProductModal.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const EditProductModal = ({ productId, closeModal }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        quantity: '',
        price: ''
    });

    useEffect(() => {
        if (!productId) return;

        const productRef = doc(db, "products", productId);
        getDoc(productRef).then(docSnap => {
            if (docSnap.exists()) {
                setProduct(docSnap.data());
            } else {
                toast.error("Produto não encontrado!");
                closeModal();
            }
        }).catch(error => {
            toast.error("Erro ao buscar dados do produto: " + error.message);
        });
    }, [productId, closeModal]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const productRef = doc(db, "products", productId);
        
        updateDoc(productRef, product).then(() => {
            toast.success("Produto atualizado com sucesso!");
            closeModal();
        }).catch(error => {
            console.error("Erro ao atualizar produto: ", error);
            toast.error("Erro ao atualizar produto: " + error.message);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-4 rounded-lg max-w-md w-full space-y-4">
                <h2 className="text-2xl font-bold mb-4">Editar Produto</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                        <input type="text" name="name" value={product.name} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea name="description" rows="3" value={product.description} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantidade</label>
                        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preço</label>
                        <input type="text" name="price" value={product.price} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Cancelar</button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
