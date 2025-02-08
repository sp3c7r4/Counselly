import bcrypt from 'bcryptjs';
import BaseRepository from './baseRepository.js';
import User from '../userModel.js';

export default class UserRepository {
  static async encryptDataPassword(data) {
    if (data?.password) {
      data.password = await bcrypt.hash(data?.password, 10);
    }
    return data;
  }

  static getBaseRepository() {
    return new BaseRepository(User);
  }

  //Create a User
  static async createUserData(data) {
    const baseRepository = this.getBaseRepository();
    const newData = await this.encryptDataPassword(data);
    return await baseRepository.create(newData);
  }

  //Read user data
  static async readUserDataById(id) {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.readOneById(id);
  }

  static async readUserDataByEmail(email) {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.readOneByEmail(email);
  }

  static async readAllUserData() {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.readAll();
  }

  // Update user data
  static async updateUserData(id, data) {
    console.log(id, data);
    const baseRepository = this.getBaseRepository();
    return await baseRepository.updateModel(id, data);
  }

  // Delete user data
  static async deleteUserData(id) {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.deleteModel(id);
  }
}
