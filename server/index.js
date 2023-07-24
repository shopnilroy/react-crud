const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@cluster0.c6qt32p.mongodb.net/?retryWrites=true&w=majority`;


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
    // await client.connect();

    const database = client.db("WebDB");
    const userCollection = database.collection("UserCollection");


    app.get('/', async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    
app.get('/update/:id', async (req, res) => {
      const id = req.params.id
      // console.log("please delete from db",id);
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.findOne(query)
      res.send(result)

    })

    app.post('/add', async (req, res) => {
      const newUser = req.body;
      console.log('new user', newUser);
      const query={name:newUser.name,email:newUser.email}
      const checkExistingData=await userCollection.findOne(query)
      if(checkExistingData){
        return res.send({message:"Info already exists"})
      }
      const result = await userCollection.insertOne(newUser);
      res.send(result)

    })
    app.post('/', async (req, res) => {
      try {
        const newUser = req.body;
        console.log('New Data:', newUser);
        const result = await userCollection.insertMany(newUser);
        console.log(`${result.insertedCount} documents were inserted`);
      } catch (error) {
        res.status(500).json({ error: 'Error saving data to MongoDB.', errorMessage: error.message });
      }
    });
    
    




    app.put('/update/:id', async (req, res) => {
      const id = req.params.id
      const user = req.body
      console.log(user);
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateUser = req.body
      const currentUser = {
        $set: {
          name:updateUser.name,
          email:updateUser.email
        },

      };
      const result = await userCollection.updateOne(filter, currentUser, options)
      res.send(result)
    })

    app.delete('/:id', async (req, res) => {
      const id = req.params.id
      // console.log("please delete from db",id);
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query)
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


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
