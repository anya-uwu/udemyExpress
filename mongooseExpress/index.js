const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("mongo connection open")
    })
    .catch(err => {
        console.log("oh no mongo error!")
        console.log(err)
    });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    // console.log(products)
    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = Product.findByIdAndUpdate(id, req.body, {runValidators: true})
    console.log(req.body)
    res.send('PUT!!!')
})

app.listen(3000, () => {
    console.log('app is listening on port 3000')
})