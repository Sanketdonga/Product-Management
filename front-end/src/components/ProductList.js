import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {

        try {
            let result = await fetch("http://localhost:5000/products", {
                headers:
                    { authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}` }
            });
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id) => {

        try {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: "delete",
                headers:
                    { authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}` }
            });

            if (result) {
                alert("Are you sure you want to delete?")
                getProducts();
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleSearch = async (event) => {
        try {
            const key = event.target.value;
            if (key) {
                let result = await fetch(`http://localhost:5000/search/${key}`, {
                    headers:
                        { authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}` }
                });
                result = await result.json();
                if (result) {
                    setProducts(result);
                }

            } else {
                getProducts();
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='product-list'>
            <h3 style={{ marginBottom: "15px" }}>ProductList</h3>
            <input type='text' onChange={handleSearch} className='search-input-box' placeholder='Search Product' />
            <ul>
                <li>Sr No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>

            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteItem(item._id)}>delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>
                ) : <h3 style={{ margin: "15px", color: "skyblue" }}>No Product Found</h3>
            }
        </div>
    )
}

export default ProductList
