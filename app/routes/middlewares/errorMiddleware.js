// import Response from '../../domain/response.js';
// import CustomError from './../../util/error.js';
// import HttpStatus from '../../util/http.js';
// import schoolLogger from '../../util/logTracker.js';
// import errorHelper from '../../helpers/errorHelpers.js';

import Response from "../../domain/reponse.js";
import errorHelper from "../../helpers/errorHelper.js";
import CustomError from "../../utils/error.js";
import HttpStatus from "../../utils/http.js";
import schoolLogger from "../../utils/logTracker.js";

const errorHandler = (error, req, res, next) => {
  console.log("Spectra Error:", error)
  schoolLogger.log('error', JSON.stringify(errorHelper.returnErrorLog(error)));
  if (error instanceof CustomError) {
    const { status, status_code, message } = error;
    const response = new Response(status_code, status, message, {});
    res.status(status_code).send(response);
    //uncomment this next sir 
    next();
  } else {
    const response = new Response(
      HttpStatus.INTERNAL_SERVER_ERROR.code,
      HttpStatus.INTERNAL_SERVER_ERROR.status,
      'Something went wrong',
      {}
    );
    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(response);
  }
};

export default errorHandler;
