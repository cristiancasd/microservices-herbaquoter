
const errors = {
    /*BadRequestError: { //400
        description: "Bad response server", // response desc.
        content: {
            // content-type
            "application/json": {
                schema: {
                    $ref: "#/components/responses/BadRequestError", // quoter model
                },
            },
        },
    },*/

    InternalServerError: { //500
        description: "Internal server error", // response desc.
        content: {
            // content-type
            "application/json": {
                schema: {
                    $ref: "#/components/responses/InternalServerError", // quoter model
                },
            },
        },
    },

    AuthError: { //401
        description: "You need to be authenticated", // response desc.
        content: {
            // content-type
            "application/json": {
                schema: {
                    $ref: "#/components/responses/AuthError", // quoter model
                },
            },
        },
    },

    ForbidenError: { //403
        description: "You don't have access to this route", // response desc.
        content: {
            // content-type
            "application/json": {
                schema: {
                    $ref: "#/components/responses/ForbidenError", // quoter model
                },
            },
        },
    },

    NotFoundError: { //404
        description: "Not found", // response desc.
        content: {
            // content-type
            "application/json": {
                schema: {
                    $ref: "#/components/responses/NotFoundError", // quoter model
                },
            },
        },
    },

    ServiceUnvailableError: { //503
        description: "Internal Error, service not implmented", // response desc.
        content: {
            // content-type
            "application/json": {
                schema: {
                    $ref: "#/components/responses/ServiceUnvailableError", // quoter model
                },
            },
        },
    },
    RequestValidationError: { //400
        description: "Customer input data error", // response desc.
        content: {
            // content-type
            "application/json": {
                schema: {
                    $ref: "#/components/responses/RequestValidationError", // quoter model
                },
            },
        },
    },
    /*UploadFileError: { //400
        description: "File error", // response desc.
        content: {
            // content-type
            "application/json": {
                schema: {
                    $ref: "#/components/responses/UploadFileError", // quoter model
                },
            },
        },

    },*/

}
exports.errors = errors