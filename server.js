const express = require('express')
const app = express()
const port = 3000

app.use(express.static('dist/public'))
app.use(express.json()) // for parsing application/json
const products = [
    {id_product: 123, product_name: "Ноутбук", price: 45600},
    {id_product: 456, product_name: "Мышка", price: 1000}
    ]

let cart = []

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/cart', (req, res) => {
    res.json(cart)
})

app.post('/addProduct', (req, res) => {
    const pr = req.body
    cart.push(pr)
    res.json(pr)
})

app.delete('/deleteProduct', (req, res) => {
    cart = cart.filter(x => x.id_product !== req.body.id_product)
    res.end();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
