'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(title, salary) {
  if(!title) throw new Error('expected title');
  if(!salary) throw new Error('expected salary');

  this.id = uuidv4();
  this.title = title;
  this.salary = salary;
};