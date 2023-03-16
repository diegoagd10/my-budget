import PouchDB from 'pouchdb-browser';
import pouchdbfind from 'pouchdb-find';

PouchDB.plugin(pouchdbfind);

const Databases = {
  categories: new PouchDB('categories'),
  transactions: new PouchDB('transaction')
};

/*
*********************
* Indexes           *
*********************
*/
Databases.transactions.createIndex({
  index: {
    fields: ['date']
  }
}).catch(error => console.error(error));

Databases.transactions.createIndex({
  index: {
    fields: ['startDate', 'endDate']
  }
}).catch(error => console.error(error));

export default Databases;