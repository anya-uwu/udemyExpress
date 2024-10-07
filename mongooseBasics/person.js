const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/personApp')
    .then(() => {
        console.log("connection open")
    })
    .catch(err => {
        console.log("oh no error!")
        console.log(err)
    });

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function() {
    console.log("about to save")
})

personSchema.post('save', async function() {
    console.log("just saved")
})

const Person = mongoose.model('Person', personSchema)