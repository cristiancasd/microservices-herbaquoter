const { errors } = require("./errors");

module.exports = {
    // method of operation
    put: {
      security:[{
        bearerAuth: []
      },],

      tags: ["Files CRUD"], // operation's tag.
      description: "Edit a image by id", // operation's desc.
      operationId: "updateImage", // unique operation id.
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
          "multipart/form-data": {
            schema: {
              type: "object",
              properties:{
                archivo:{
                  type: "string",
                  format: "binary"
                }
              }
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
                $ref: "#/components/responses/updateImageResponse", // quoter model
              },
            },
          }, 
        },
        //500: {...errors.InternalServerError},
        400: {...errors.RequestValidationError},
        //400: {...errors.UploadFileError},
        401: {...errors.AuthError},
        403: {...errors.ForbidenError},
        404: {...errors.NotFoundError},
        //503: {...errors.ServiceUnvailableError},
        //400: {...errors.UploadFileError},
      },
    },
  };