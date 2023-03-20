const { errors } = require("./errors");

module.exports = {
    // method of operation
    get: {
      /*security:[{
        bearerAuth: []
      },],*/

      tags: ["Files CRUD"], // operation's tag.
      description: "Get default static image by name", // operation's desc.
      operationId: "getDefaultImage", // unique operation id.
      parameters: [
        // expected params.
        {
          name: "imageName", // name of the param
          in: "path", // location of the param
          schema: {
              type: "string", // data type
              description: "name of image", // desc
              example: "loseweight-medium.jpg", // example of an id
            },  
          required: true, // Mandatory param
          description: "Image name to search", // param desc.
        },
      ], // expected params.

      // expected responses
      responses: {
        // response code
        200: {
          description: "Image opened", // response desc.
        },
        //500: {...errors.InternalServerError},
        //400: {...errors.BadRequestError},
        //400: {...errors.RequestValidationError},
        //401: {...errors.AuthError},
        //403: {...errors.ForbidenError},
        404: {...errors.NotFoundError},
        //503: {...errors.ServiceUnvailableError},
        //400: {...errors.RequestValidationError},
        //400: {...errors.UploadFileError},
      },
    },
  };