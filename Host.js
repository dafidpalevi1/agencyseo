const mongoose = require('mongoose');

const hostSchema = new mongoose.Schema({
  hostName: String,
  accountStatus: String,
  berlianBulanIni: String,
  durasiLiveBulanIni: String,
  hariBerlakuBulanIni: String,
  targetBerlianDasar: String
});

const Host = mongoose.model('Host', hostSchema);

module.exports = Host;
