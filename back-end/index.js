const express = require("express");
const app = express();

const cors = require('cors');
const jwt = require('jsonwebtoken');

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");

const port = process.env.PORT || 5000;

const jwtkey = "e-comm";


//Middle ware
app.use(express.json());
app.use(cors());


app.post("/register", async (req, res) => {

    try {

        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;

        jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                res.send(err);
            }
            res.send({ result, auth: token });
        })
    } catch (error) {
        res.send(error);
    }

})


app.post("/login", async (req, res) => {
    try {
        if (req.body.password && req.body.email) {
            const user = await User.findOne(req.body).select("-password");
            if (user) {
                jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        res.send(err);
                    }
                    res.send({ user, auth: token });
                })
            } else {
                res.send({ result: 'No User Found' })
            }
        }
    } catch (error) {
        console.log(error);
    }
})

app.post("/add-product", verifyToken, async (req, res) => {

    try {
        let product = new Product(req.body);
        let result = await product.save();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});


app.get("/products/:userid", verifyToken, async (req, res) => {

    try {
        const products = await Product.find({ userid: req.params.userid });

        if (products.length > 0) {
            res.send(products);
        } else {
            res.send({ result: "No Product Found" })
        }
    } catch (error) {
        console.log(error);
    }

});


app.delete("/product/:id", verifyToken, async (req, res) => {

    try {
        let result = await Product.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});


app.get("/product/:id", verifyToken, async (req, res) => {
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


app.put("/product/:id", verifyToken, async (req, res) => {
    try {
        let result = await Product.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: req.body
            },
            { new: true } // To return the updated document
        );
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});


app.get("/search/:key", verifyToken, async (req, res) => {
    try {
        let result = await Product.find({
            "$or": [
                { name: { $regex: req.params.key } },
                { category: { $regex: req.params.key } },
                { company: { $regex: req.params.key } }
            ]
        });
        // result = await result.json();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    console.log(token);
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please Provider Valid token" });
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "Please Provider Token with headers" });
    }
}

app.listen(port, () => `Server running on port ${port} 🔥`);