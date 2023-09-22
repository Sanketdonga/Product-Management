import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();

    useEffect(()=>{
        getProduct();
    },[])

    const getProduct = async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`);

            result=await result.json();

            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);

        } catch (error) {
            console.log(error);
        }

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

            <button type='button' className='appButton' >Update Product</button>

        </div>
    )
}

export default UpdateProduct;
