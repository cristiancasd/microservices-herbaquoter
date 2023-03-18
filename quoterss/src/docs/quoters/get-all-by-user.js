const { errors } = require("./errors");

module.exports = {
    // method of operation
    get: {
      security:[{
        bearerAuth: []
      },],

      tags: ["Quoters CRUD"], // operation's tag.
      description: "Get all quoters by user", // operation's desc.
      operationId: "getAllByUser", // unique operation id.
      parameters: [
        // expected params.
        {
          name: "idUser", // name of the param
          in: "path", // location of the param
          schema: {
            $ref: "#/components/schemas/id", // data model of the param
          },
          required: true, // Mandatory param
          description: "UUID id", // param desc.
        },
      ], // expected params.

      
      // expected responses
      responses: {
        // response code
        200: {
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
        //400: {...errors.BadRequestError},
        400: {...errors.RequestValidationError},
        //401: {...errors.AuthError},
        //403: {...errors.ForbidenError},
        404: {...errors.NotFoundError},
        //503: {...errors.ServiceUnvailableError},
        //400: {...errors.RequestValidationError},
        //400: {...errors.UploadFileError},
      },
    },
  };