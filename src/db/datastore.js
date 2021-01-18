
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const Memory = require('lowdb/adapters/Memory')

const db = low(
  process.env.NODE_ENV === 'test'
    ? new Memory()
    : new FileSync('db.json')
)


export default db;
