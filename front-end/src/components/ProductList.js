import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {

        try {
            let result = await fetch("http://localhost:5000/products");
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id) => {

        try {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: "delete"
            });

            if (result) {
                alert("Are you sure you want to delete?")
                getProducts();
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='product-list'>
            <h3 style={{ marginBottom: "15px" }}>ProductList</h3>
            <ul>
                <li>Sr No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>

            {
                products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteItem(item._id)}>delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>
                )
            }
        </div>
    )
}

export default ProductList
