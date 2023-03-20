const { errors } = require("./errors");

module.exports = {
    // method of operation
    put: {
      security:[{
        bearerAuth: []
      },],

      tags: ["Quoters CRUD"], // operation's tag.
      description: "Edit a quoter by id", // operation's desc.
      operationId: "updateQuoter", // unique operation id.
      parameters: [
        // expected params.
        {
          name: "id", // name of the param
          in: "path", // location of the param
          schema: {
            $ref: "#/components/schemas/id", // data model of the param
          },
          required: true, // Mandatory param
          description: "UUID id", // param desc.
        },
      ], // expected params.
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
        200: {
          description: "All quoters were obtained", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/responses/quoterResponse", // quoter model
              },
            },
          }, 
        },
        500: {...errors.InternalServerError},
        400: {...errors.RequestValidationError},
        //400: {...errors.UploadFileError},
        401: {...errors.AuthError},
        403: {...errors.ForbidenError},
        //404: {...errors.NotFoundError},
        //503: {...errors.ServiceUnvailableError},
        //400: {...errors.UploadFileError},
      },
    },
  };