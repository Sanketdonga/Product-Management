const express = require("express");
const app = express();
require("./db/config");
const User = require("./db/User");
const cors = require('cors');
const Product = require("./db/Product");
const port = process.env.PORT || 5000;


//Middle ware
app.use(express.json());
app.use(cors());


app.post("/register", async (req, res) => {

    try {

        let user = new User(req.body);

        let result = await user.save();

        result = result.toObject();

        delete result.password;

        res.send(result);

    } catch (error) {
        res.send(error);
    }

})


app.post("/login", async (req, res) => {
    try {

        if (req.body.password && req.body.email) {
            const user = await User.findOne(req.body).select("-password");
            if (user) {
                res.send(user);
            } else {
                res.send({ result: 'No User Found' })
            }
        } else {
            res.send({ result: 'No User Found' })
        }

    } catch (error) {
        console.log(error);
    }
})

app.post("/add-product", async (req, res) => {

    try {
        let product = new Product(req.body);
        let result = await product.save();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});


app.get("/products", async (req, res) => {

    try {
        const products = await Product.find();

        if (products.length > 0) {
            res.send(products);
        } else {
            res.send({ result: "No Product Found" })
        }
    } catch (error) {
        console.log(error);
    }

});


app.delete("/product/:id", async (req, res) => {

    try {
        let result = await Product.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});


app.get("/product/:id", async (req, res) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.send(result);
        } else {
            res.send({ result: "No Record Found" });
        }
    } catch (error) {
        console.log(error);
    }
});


app.listen(port, () => `Server running on port ${port} 🔥`);