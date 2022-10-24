// const { validationResult } = require('express-validator')
// const fs = require('fs')
// let _mahasiswa = JSON.parse(fs.readFileSync('./database/mahasiswa.json'))

// const findMahasiswa = (nama) => {
//     const detailMhs = _mahasiswa.find(mhs => mhs.nama.toLowerCase() === nama.toLowerCase())
//     return detailMhs
// }

// const addMahasiswa = (n) => {
//     const Mhs = _mahasiswa.push(n)
//     saveMahasiswa(_mahasiswa)
// }

// const saveMahasiswa = s => {
//     fs.writeFileSync('./database/mahasiswa.json', JSON.stringify(s))
// }

// const loadMahasiswa = () => {
//     const mahas = fs.readFileSync('./database/mahasiswa.json', 'utf-8')
//     const mhs = JSON.parse(mahas)
//     return mhs
// }

// const checkDuplicate = (v) => {
//   return _mahasiswa.find(m => m.nama.toLowerCase() === v.toLowerCase())

// }

// module.exports = {findMahasiswa, addMahasiswa, loadMahasiswa, checkDuplicate}
