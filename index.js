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
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const bookCategory = client.db('theBookSpot').collection('categoryName');
        const bookCollection = client.db('theBookSpot').collection('categories');

        app.get('/categories', async(req, res) =>{
            const query ={}
            const cursor = bookCategory.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        })
        app.get('/category', async(req, res) =>{
            const query ={}
            const cursor = bookCollection.find(query);
            const category = await cursor.toArray();
            res.send(category);
        })

        // app.get('/category/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) }
        //     const categoryId = await bookCollection.findOne(query);
        //     res.send(categoryId);
        // })
        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { categoryId: id }
            const cursor = bookCollection.find(query);
            const categoryId = await cursor.toArray();
            res.send(categoryId);
        })
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