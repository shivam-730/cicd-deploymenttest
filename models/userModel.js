const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

class User {
  static collection() {
    return getDB().collection('users');
  }

  static async findByEmail(email) {
    return await this.collection().findOne({ email });
  }

  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async create(userData) {
    const result = await this.collection().insertOne(userData);
    return { _id: result.insertedId, ...userData };
  }
}

module.exports = User;
