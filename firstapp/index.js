const express = require("express");
const app = express()

// when we have an incoming request this runs
// app.use((req, res) => {
//     console.log("hellooo new request")
//     // this is versatile you can respond with lots of things
//     res.send("hello we got your request!")
// })

// routing

app.get('/', (req, res) => {
    res.send('this is the home page')
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1> browsing the ${subreddit} subreddit</h1>`)
})

app.post('/cats', (req, res) => {
    res.send('post request to /cats')
})

app.get('/cats', (req, res) => {
    res.send('meow')
})

app.get('/dogs', (req, res) => {
    res.send('woof')
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    res.send(`<h1>Search results for: ${q}</h1>`)
})

app.get('*', (req, res) => {
    res.send(`I don't know that path!`)
})


// listens for incoming requests
app.listen(3000, () => {
    // run when app has started listening
    console.log("listening on port 3000")
})