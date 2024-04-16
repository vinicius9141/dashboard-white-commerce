// src/components/ProductManagement.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import EditProductModal from './EditProductModal';
import { toast } from 'react-toastify';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "products"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const productList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productList);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "products", id));
            toast.success("Produto removido com sucesso!");
        } catch (error) {
            console.error("Erro ao remover produto: ", error);
            toast.error("Erro ao remover produto.");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Gerenciamento de Produtos</h2>
            {products.map(product => (
                <div key={product.id} className="border p-4 mb-2 flex flex-col md:flex-row">
                    <div className="md:flex-shrink-0">
                        {product.images && product.images[0] && (
                            <img src={product.images[0]} alt="Product" className="w-full h-48 object-cover md:w-48 rounded-lg" />
                        )}
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                        <p>Nome: {product.name}</p>
                        <p>Descrição: {product.description}</p>
                        <p>Quantidade: {product.quantity}</p>
                        <p>Preço: R$ {product.price}</p>
                        <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2">
                            Remover
                        </button>
                        <button onClick={() => setEditingProduct(product.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Editar
                        </button>
                    </div>
                </div>
            ))}
            {editingProduct && <EditProductModal productId={editingProduct} closeModal={() => setEditingProduct(null)} />}
        </div>
    );
};

export default ProductManagement;
