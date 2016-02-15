'use strict';

let Coiffeur = require('../models/coiffeur');

let service = {
  getCoiffeurs *() {
    try {
      const coiffeurs = Coiffeur.find({}).exec();
      //do something else then send over to io;
      return coiffeurs;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
