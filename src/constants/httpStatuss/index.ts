const HTTP_STATUS = {
  // Successful responses
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Client error responses
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  CONFLICT: 409,

  // Server error responses
  INTERNAL_SERVER_ERROR: 500
} as const;

export default HTTP_STATUS;
