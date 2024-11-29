const express = require('express');
const app = express();
const morgan = require('morgan')

// morgan('tiny')

// app.use(morgan('common'))

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("i love dogs!!!!")
    next();
})

const verifyPassword = (req, res, next) => {
    const {password} = req.query;
    if (password === 'pikachu') {
        next();
    }
    res.send('sorry you need a password')
}

app.get('/', (req, res) => {
    console.log(`request date: ${req.requestTime}`)
    res.send('home page')
})



app.get('/dogs', (req, res) => {
    console.log(`request date: ${req.requestTime}`)
    res.send('woof woof')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('my secret is: i like squirrels')
})

app.use((req, res) => {
    res.send('404 not found')
})

app.listen(3000, () => {
    console.log('app is running')
})