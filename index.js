const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, ()=>{
  console.log(`server is running on port: ${port}`);
})

app.get("/", (req, res)=>{
  res.send("server is running data will be coming soon...")
})

// hmasrafulmasum
// NojdBHMdNVzP1QGo

console.log(process.env.DB_USER);

const uri = "mongodb+srv://hmasrafulmasum:NojdBHMdNVzP1QGo@carmart.ad0dhwu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const database = client.db("carMartDB")
    const usersCollections = database.collection("usersDB")
    const carsCollections = database.collection("carsDB")
    const cartCollections = database.collection("cartDB")

    app.get("/users", async(req, res)=>{
      const cursor = usersCollections.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post("/users", async(req, res)=>{
      const user = req.body
      const result = await usersCollections.insertOne(user)
      res.send(result)
    })


    app.get("/cars/:id", async(req, res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const car = await carsCollections.findOne(query)
      res.send(car)
    })


    app.get("/cars", async(req, res)=>{
      const cursor = carsCollections.find()
      const result = await cursor.toArray()
      res.send(result)
    })


    app.post("/cars", async(req, res)=>{
      const car = req.body
      const result = await carsCollections.insertOne(car)
      res.send(result)
    })


    app.get("/cart", async(req, res)=>{
      const cursor = cartCollections.find()
      const result = await cursor.toArray()
      res.send(result)
    })


    app.post("/cart", async(req, res)=>{
      const cart = req.body
      const result = await cartCollections.insertOne(cart)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
