import { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';



const ProductForm = ({ onSubmit }) => {
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        quantity: '',
        price: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        if (event.target.files.length > 3) {
            toast.error("Você só pode carregar até 3 imagens.");
            return;
        }
        setImages([...event.target.files]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageUrls = await Promise.all(
            [...images].map(async (image) => {
                const fileRef = ref(storage, `products/${Date.now()}_${image.name}`);
                await uploadBytes(fileRef, image);
                return getDownloadURL(fileRef);
            })
        );
    
        const productWithImages = {
            ...product,
            images: imageUrls,
            createdAt: serverTimestamp()
        };
    
        try {
            await addDoc(collection(db, "products"), productWithImages);
            toast.success('Produto cadastrado com sucesso!');
            setProduct({ name: '', description: '', quantity: '', price: '' });
            setImages([]);
        } catch (error) {
            console.error("Erro ao cadastrar produto: ", error);
            toast.error(`Erro ao cadastrar produto: ${error.message}`);
        }
    };
    
    
    
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Produto</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            <div className='mb-4'>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="mt-1 block w-full"
            />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={product.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantidade</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Cadastrar Produto
            </button>
        </form>
    );
};

export default ProductForm;
