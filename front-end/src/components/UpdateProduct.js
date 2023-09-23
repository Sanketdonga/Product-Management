import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`, {
                headers:
                    { authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}` }
            });

            result = await result.json();

            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);

        } catch (error) {
            console.log(error);
        }

    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`,
            {
                method: "Put",
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            }
        );
        result = await result.json();
        navigate("/")
    }

    return (
        <div className='product'>

            <h3 className='heading'>Update Product</h3>

            <input type="text" placeholder='Enter Product Name' className='inputBox' value={name}
                onChange={(e) => setName(e.target.value)} />

            <input type="text" placeholder='Enter Product Price' className='inputBox' value={price}
                onChange={(e) => setPrice(e.target.value)} />

            <input type="text" placeholder='Enter Product Category' className='inputBox' value={category}
                onChange={(e) => setCategory(e.target.value)} />

            <input type="text" placeholder='Enter Product Company' className='inputBox' value={company}
                onChange={(e) => setCompany(e.target.value)} />

            <button type='button' className='appButton' onClick={updateProduct} >Update Product</button>

        </div>
    )
}

export default UpdateProduct;
