import BaseRepository from './baseRepository.js';
import Chat from '../chatModel.js';

export default class ChatRepository {

  static getBaseRepository() {
    return new BaseRepository(Chat);
  }

  //Create a User
  static async createChatData(data) {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.create(data);
  }

  //Read user data
  static async readChatDataById(id) {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.readOneById(id);
  }

  static async readChatDataByEmail(email) {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.readOneByEmail(email);
  }

  static async readAllChatData() {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.readAll();
  }
  
  static async readAllChatDataByID(user_id) {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.readAllByID(user_id);
  }

  // Update user data
  static async updateChatData(id, data) {
    console.log(id, data);
    const baseRepository = Chat
    return await baseRepository.findOneAndUpdate(
      { _id: data.chatId, user_id: data.userId },
      { $push: { history: { user: data.userMessage, model: data.modelMessage } } },
      { upsert: true, new: true }
    )
  }

  // Delete user data
  static async deleteChatData(id) {
    const baseRepository = this.getBaseRepository();
    return await baseRepository.deleteModel(id);
  }
}
