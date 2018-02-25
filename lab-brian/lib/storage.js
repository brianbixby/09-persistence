'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom' });

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!item) return Promise.reject(new Error('expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json) 
    .then( () => item)
    .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch(err) {
        return Promise.reject(err);
      }
    })
    .catch(err => Promise.reject(err));
};

exports.fetchDir = function(schemaName) {
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  return fs.readdirProm(`${__dirname}/../data/${schemaName}/`)
    .catch( err => Promise.reject(err));
};

exports.fetchItems = function(schemaName, id) {
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}`)
    .then( data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch(err) {
        return Promise.reject(err);
      }
    })
    .catch(err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  if(!schemaName) return new Error('expected schema name');
  if(!id) return new Error(' expected schema name');

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( () => `${schemaName}/${id}.json`)
    .catch( err => Promise.reject(err));
};

exports.updateItem = function(schemaName, id, item) {
  if(!schemaName) return new Error('expected schema name');
  if(!id) return (new Error(' expected id'));
  if(!item) return Promise.reject(new Error('expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json) 
    .then( () => item)
    .catch( err => Promise.reject(err));
};