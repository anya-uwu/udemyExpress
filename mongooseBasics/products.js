const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log("connection open")
    })
    .catch(err => {
        console.log("oh no error!")
        console.log(err)
    });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'price must be postive']
    },
    onSale: {
        type: Boolean,
        default: false
    }
});

productSchema.methods.greet = function() {
    console.log("Helloooo!!!!!")
    console.log(`- from ${this.name}`)
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Tire Pump' });
    foundProduct.greet();
}

Product.fireSale().then(res => console.log(res))

// findProduct();

// const bike = new Product({ name: 'shoes', price: 40 })
// bike.save()
// .then(data => {
//     console.log('it worked')
//     console.log(data)
// })
// .catch(err => {
//     console.log('womp womp')
//     console.log(err)
// })