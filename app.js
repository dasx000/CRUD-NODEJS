/* BELAJAR NODEJS : DIKY ADISAPUTRA 03 JUNI 2021 */
//=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
// let _mahasiswa = JSON.parse(fs.readFileSync('./database/mahasiswa.json'))
const {
  findMahasiswa,
  addMahasiswa,
  loadMahasiswa,
  checkDuplicate,
} = require('./lib/mahasiswa.js');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { Student } = require('./lib/db.js');
const methodOverride = require('method-override');

//=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(methodOverride('_method'));
//=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_

app.get('/', (req, res) => {
  res.render('index', { layout: 'layout/main-layout.ejs', title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'layout/main-layout.ejs', title: 'about' });
});

app.get('/mahasiswa', async (req, res) => {
  // _mahasiswa = loadMahasiswa()
  let _m = await Student.find();
  // return console.log(_mahasiswa)
  res.render('mahasiswa', {
    layout: 'layout/main-layout.ejs',
    title: 'Daftar Mahasiswa',
    _m,
    msg: req.flash('msg'),
  });
});

app.delete('/mahasiswa', (req, res) => {
  Student.deleteOne({ nama: req.body.nama })
    .then((result) => console.log(result))
    .then((result) => {
      req.flash('msg', 'Data Berhasil Dihapus');
      res.redirect('/mahasiswa');
      console.log(result);
    })
    .catch((err) => console.log(err));
});

// TAMBAH MAHASISWA
app.get('/add', async (req, res) => {
  let _mahasiswa = await Student.find();
  res.render('add', {
    layout: 'layout/main-layout.ejs',
    title: 'Tambah Mahasiswa',
    _mahasiswa,
  });
});

app.post(
  '/mahasiswa',
  [
    body('nama').custom(async (value) => {
      const isDuplicate = await Student.findOne({ nama: value });
      if (isDuplicate) {
        throw new Error('Nama sudah terdaftar!');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nomor', 'Nomor tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add', {
        layout: 'layout/main-layout.ejs',
        title: 'Halaman Tambah Data',
        errors: errors.array(),
      });
      // return res.status(400).json({ errors: errors.array() });
    } else {
      addMahasiswa(req.body);
      Student.insertMany(req.body, (error, result) => {
        req.flash('msg', 'Data Berhasil Ditambahkan');
        res.redirect('/mahasiswa');
      });
    }
  }
);

app.put(
  '/mahasiswa',
  [
    body('nama').custom(async (value, { req }) => {
      const isDuplicate = await Student.findOne({ nama: value });
      if (isDuplicate && value !== req.body.oldNama) {
        throw new Error('Nama sudah terdaftar!');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('nomor', 'Nomor tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add', {
        layout: 'layout/main-layout.ejs',
        title: 'Halaman Tambah Data',
        errors: errors.array(),
      });
      // return res.status(400).json({ errors: errors.array() });
    } else {
      // addMahasiswa(req.body);
      Student.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nomor: req.body.nomor,
          },
        }
      ).then((result) => {
        req.flash('msg', 'Data Berhasil Diubah');
        res.redirect('/mahasiswa');
      });
    }
  }
);
/////

app.get('/mahasiswa/:nama', async (req, res) => {
  const detail = await Student.findOne({ nama: req.params.nama });
  res.render('detail', {
    layout: 'layout/main-layout.ejs',
    title: 'Detail Mahasiswa',
    detail,
  });
});

app.get('/mahasiswa/edit/:nama', async (req, res) => {
  const edit = await Student.findOne({ nama: req.params.nama });
  res.render('edit', {
    layout: 'layout/main-layout.ejs',
    title: 'Edit Data',
    edit,
  });
});

app.use('/', (req, res) => {
  res.render('index', { layout: 'layout/main-layout.ejs', title: 'Home' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
