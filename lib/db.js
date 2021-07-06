//=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_

const mongoose = require('mongoose');
// const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'diky'
// const das = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true

//   });
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

  });
//=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
const Student = mongoose.model('Student', {
    nama: {
        type: String,
        required:true
    },
    nomor: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})



// const mhs1 = new Student({
//     nama: 'asdfasdf',
//     nomor: 'asfdasdf',
//     email: 'asfas'
// })

// mhs1.save().then(c => console.log(c))

module.exports = {Student}