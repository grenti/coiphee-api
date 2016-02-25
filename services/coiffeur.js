
const Coiffeur = require('../models/coiffeur');

let service = {
  getCoiffeurs: function *() {
    try {
      const coiffeurs = Coiffeur.find({}).exec();
      // do something else then send over to io;
      return coiffeurs;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};

module.exports = service;
