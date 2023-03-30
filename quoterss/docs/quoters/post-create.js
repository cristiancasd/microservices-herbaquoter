const { errors } = require("./errors");

module.exports = {
    // method of operation
    post: {
      security:[{
        bearerAuth: []
      },],

      tags: ["Quoters CRUD"], // operation's tag.
      description: "Create a new quoter", // operation's desc.
      operationId: "postCreate", // unique operation id.
      parameters: [], // expected params.

      requestBody: {
        // expected request body
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/quoterInput", // todo input data model
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        201: {
          description: "All quoters were obtained", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/quoterResponse", // quoter model
              },
            },
          }, 
        },
        500: {...errors.InternalServerError},
        400: {...errors.RequestValidationError},
        //400: {...errors.UploadFileError},
        401: {...errors.AuthError},
        //403: {...errors.ForbidenError},
        //404: {...errors.NotFoundError},
        //503: {...errors.ServiceUnvailableError},
        //400: {...errors.UploadFileError},
      },
    },
  };