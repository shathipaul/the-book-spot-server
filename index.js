const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j6khnv2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const categoriesCollection = client.db('theBookSpot').collection('categories');
        const bookCollection = client.db('theBookSpot').collection('bookCollection');
        const bookingsCollection = client.db('theBookSpot').collection('bookings');
        const productCollection = client.db('theBookSpot').collection('products');

            //getting categories
        app.get('/categories', async(req, res) =>{
            const query ={}
            const cursor = categoriesCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        })
        
            //getting categories by Id
        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id }
            const cursor = bookCollection.find(query);
            const categoryId = await cursor.toArray();
            res.send(categoryId);
        })
            //getting bookings
        app.get('/bookings', async (req, res) =>{
            const email = req.query.email;
            const query = {email: email};
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings);
        })
        
            //posting bookings
        app.post('/bookings', async (req, res) =>{
            const bookings = req.body;
            const result = await bookingsCollection.insertOne(bookings);
            res.send(result);
        }) 
            //adding products
        app.post("/addproduct", async (req, res) => {
            const products = req.body;
            const result = await productCollection.insertOne(products);
            res.send(result);
          });
        
       
    }
    finally{

    }
}
run().catch(error =>console.error(error))


app.get('/', (req, res) =>{
    res.send('The book spot server is running')
})

app.listen(port, () =>{
    console.log(`The book spot server is running on ${port}`);
})