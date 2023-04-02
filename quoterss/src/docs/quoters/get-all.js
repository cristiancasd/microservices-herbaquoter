const { errors } = require('./errors');

module.exports = {
  // method of operation
  get: {
    tags: ['Quoters CRUD'], // operation's tag.
    description: 'Get all', // operation's desc.
    operationId: 'getAll', // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: 'All quoters were obtained', // response desc.
        content: {
          // content-type
          'application/json': {
            schema: {
              $ref: '#/components/responses/quoterResponse', // quoter model
            },
          },
        },
      },
      500: { ...errors.InternalServerError },
    },
  },
};
