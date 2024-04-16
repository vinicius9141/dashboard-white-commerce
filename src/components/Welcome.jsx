// src/components/Welcome.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

const Welcome = () => {
    const [productCount, setProductCount] = useState(0);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // Listener para contar produtos
        const countQuery = query(collection(db, "products"));
        const unsubscribeCount = onSnapshot(countQuery, (snapshot) => {
            setProductCount(snapshot.size);
        });

        // Listener para últimos produtos
        const latestQuery = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(5));
        const unsubscribeLatest = onSnapshot(latestQuery, (snapshot) => {
            const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLatestProducts(products);
        });

        return () => {
            unsubscribeCount();
            unsubscribeLatest();
        };
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Bem-vindo à Dashboard!</h1>
            <div className="bg-blue-100 p-4 rounded-lg shadow mb-6">
                <h2 className="text-lg text-blue-800">Quantidade de Produtos Cadastrados:</h2>
                <p className="text-lg font-semibold">{productCount}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow">
                <h2 className="text-lg text-blue-800">Últimos Produtos Cadastrados:</h2>
                <ul>
                    {latestProducts.map(product => (
                        <li key={product.id} className="mt-2">
                            <p className="font-bold">{product.name}</p>
                            <p>Quantidade: {product.quantity}</p>
                            <p>Preço: R$ {product.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Welcome;
