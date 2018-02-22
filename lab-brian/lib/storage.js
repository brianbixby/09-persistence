'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if(!schemaName) return Promise.reject(new Error('expected schema name'));
  if(!item) return Promise.reject(new Error('expected item'));
  if(!storage[schemaName]) storage[schemaName] = {};
  storage[schemaName][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return (new Error('expected schema name'));
    if(!id) return (new Error('expected id'));
    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));
    var item = schema[id];
    if(!item) return reject(new Error('item not found'));
    resolve(item);
  });
};

exports.fetchItems = function(schemaName) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return (new Error('expected schema name'));
    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));
    resolve(schema);
  });
};

exports.deleteItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return new Error('expected schema name');
    if(!id) return (new Error('expected id'));
    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));
    var item = schema[id];
    if(!item) return reject(new Error('item not found'));
    delete storage[schemaName][id];
    resolve(item);
  });
};

exports.updateItem = function(schemaName, id, title, salary) {
  return new Promise((resolve, reject) => {
    if(!schemaName) return new Error('expected schema name');
    if(!id) return (new Error(' expected id'));
    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema note found'));
    var item = schema[id];
    if(!item) return reject(new Error('item not found'));
    item.title = title;
    item.salary = salary;
    resolve(item);
  });
};