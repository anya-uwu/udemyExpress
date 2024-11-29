const express = require('express');
const app = express();
const morgan = require('morgan')

const AppError = require('./AppError')
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
    const { password } = req.query;
    if (password === 'pikachu') {
        next();
    }
    // res.send('sorry you need a password')
    res.status(401)
    throw new AppError('password required!', 401);
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

app.get('/admin', (req, res) => {
    throw new AppError('you are not an admin!', 403)
})

app.use((req, res) => {
    res.status(404).send('not found')
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'something went wrong' } = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('app is running')
})