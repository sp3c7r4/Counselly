import errorHelper from "../../helpers/errorHelper.js";
import HttpStatus from '../../utils/http.js'
import schoolLogger from './../../utils/logTracker.js';
import CustomError from './../../utils/error.js'

export default class BaseRepository {
  constructor(model) {
    this.model = model;
    this.check = 'active';
  }

  validateDataCheck(data) {
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No data provided');
    }
  }

  //Create a User
  async create(data) {
    this.validateDataCheck(data);
    try {
      return await this.model.create(data);
    } catch (err) {
      schoolLogger.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        'Cannot create model',
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }

  // Read user data by id
  async readOneById(id) {
    try {
      const findOne = await this.model.findOne({ _id: id });
      return findOne;
    } catch (err) {
      schoolLogger.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        "Couldn't read model by id",
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }

  async readOneByEmail(email) {
    try {
      const findOne = this.model.findOne({ email });
      return findOne;
    } catch (err) {
      schoolLogger.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        "Couldn't read model by email",
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }

  async readAll() {
    try {
      return await this.model.find({});
    } catch (err) {
      schoolLogger.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        "Couldn't fetch models",
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }

  async readAllByID(user_id) {
    try {
      return await this.model.find({user_id });
    } catch (err) {
      schoolLogger.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        "Couldn't fetch models",
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }

  // Update user data
  async updateModel(id, data) {
    //Handle no data
    this.validateDataCheck(data);
    try {
      const updateModel = await this.model.findByIdAndUpdate(id, data, {new: true})
      return updateModel;
    } catch (err) {
      schoolLogger.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        'Couldn\'t update model',
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }

  // Delete user data
  async deleteModel(id) {
    try {
      const deleteModel = await this.model.findByIdAndDelete({ id });
      return deleteModel;
    } catch (err) {
      schoolLogger.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        'Could not delete model',
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }
}
