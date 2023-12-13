export const RESPONSE_STATUS = {
  OK: 200,
  ERROR: 400,
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
};

export const RESPONSE_MESSAGE = {
  OK: 'OK',
  ERROR: 'ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
};

export const Response = function Response(statusCode, message, result) {
  this.status = statusCode;
  this.message = message;
  this.result = result;
};

export const GET_ALL_USERS = 'SELECT * FROM users';