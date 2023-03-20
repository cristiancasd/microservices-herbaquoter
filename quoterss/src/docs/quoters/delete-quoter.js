const { errors } = require("./errors");

module.exports = {
    // method of operation
    delete: {
      security:[{
        bearerAuth: []
      },],

      tags: ["Quoters CRUD"], // operation's tag.
      description: "Delete a quoter by id", // operation's desc.
      operationId: "deleteQuoter", // unique operation id.
      parameters: [
        // expected params.
        {
          name: "id", // name of the param
          in: "path", // location of the param
          schema: {
            $ref: "#/components/schemas/id", // data model of the param
          },
          required: true, // Mandatory param
          description: "quoter UUID id to delete", // param desc.
        },
      ], // expected params.
     
      // expected responses
      responses: {
        // response code
        200: {
          description: "Quoter deleted", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/responses/deleteOk", // quoter model
              },
            },
          }, 
        },


        500: {...errors.InternalServerError},
        //400: {...errors.RequestValidationError},
        //400: {...errors.UploadFileError},
        //401: {...errors.AuthError},
        403: {...errors.ForbidenError},
        404: {...errors.NotFoundError},
        //503: {...errors.ServiceUnvailableError},
        //400: {...errors.UploadFileError},
      },
    },
  };