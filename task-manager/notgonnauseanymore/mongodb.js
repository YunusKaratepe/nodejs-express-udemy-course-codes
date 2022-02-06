// CRUD -> create, read, update, delete

const { MongoClient, ObjectId, Db } = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

// const id = new ObjectId()
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.');
    }
    // console.log('Connected to db!');

    const db = client.db(databaseName)

    // ********** CREATE **********
    // db.collection('users').insertOne({
    //     name: "Recep",
    //     age: 26
    // }, (error, result) => {
    //     if (error)  return console.log('Unable to insert user.');
        
    //     console.log(result);
    // })
    

    // db.collection('users').insertMany([
    //     {
    //         name: "Jen",
    //         age: 28
    //     },
    //     {
    //         name: "Gunther",
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error)  return console.log('Unable to insert documents.');
    //     console.log(result);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: "Buy shampoo",
    //         completed: false
    //     },
    //     {
    //         description: "4 pm work interview",
    //         completed: false
    //     },
    //     {
    //         description: "Buy toothpaste",
    //         completed: true
    //     }
    // ], (err, res) => {
    //     if (err) return console.log('Unable to insert tasks.');

    //     console.log(res);
    // })


    // ********** READ **********
    // db.collection('users').findOne({ name: "Jen" }, (err, res) => {
    //     if (err)  return console.log('Error');
    //     console.log(res);
    // })

    // db.collection('users').findOne({ _id: ObjectId('61ec4cd42b34448a842d1e88') }, (err, res) => {
    //     if (err)  return console.log('Error');
    //     console.log(res);
    // })

    // db.collection('users').find({ age: 26 }).toArray((err, res) => {
    //     console.log(res);
    // })

    // db.collection('users').find({ age: 26 }).count((err, res) => {
    //     console.log(res);
    // })

    // db.collection('tasks').findOne({ _id : ObjectId("61ec513ec122f5416567962a") }, (err, res) => {
    //     if (err) return console.log(err);
        
    //     console.log(res);
    // })


    // db.collection('tasks').find({ completed: false }).toArray((err, res) => {
    //     if (err) return console.log(err);
    //     console.log(res);
    // })

    // ********** UPDATE **********

    // db.collection('users').updateOne({
    //     _id: new ObjectId('61ec4f0355e24a0b08e09701')
    // }, {
    //     $set: {
    //         name: "Mike"
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectId('61ec4f0355e24a0b08e09701')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // })


    // db.collection('tasks').updateMany({}, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log('Updated info:', result)
    // }).catch((err) => {
    //     console.log(err);
    // })

    // ********** DELETE **********
    
    // db.collection('users').deleteMany({
    //     age: 22
    // }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // })

    // db.collection('tasks').deleteOne({
    //     description: "Buy shampoo"
    // }).then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // })

})










