const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");

const dbParts = low(
  process.env.NODE_ENV === "test" ? new Memory() : new FileSync("dbParts.json")
);

export default dbParts;
