const express = require('express');
const cors = require('cors');

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


const { MongoClient, ServerApiVersion } = require('mongodb');
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

    app.post("/users", async(req, res)=>{
      const user = req.body
      const result = await usersCollections.insertOne(user)
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
