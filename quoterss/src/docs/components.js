module.exports = {
  components: {
    schemas: {
      // Quoter model
      id: {
        type: 'string', // data type
        description: 'UUID', // desc
        example: '49c0d634-8471-409f-9680-fe7adcaec3bb', // example of an id
      },
      quoter: {
        type: 'object', // data type
        properties: {
          id: {
            type: 'string', // data-type
            description: 'UUID number', // desc
            example: 'e5f5e4cf-f8df-4b95-b56e-56b9b17398d5', // example of an id
          },
          title: {
            type: 'string', // data-type
            description: "Quoter's title", // desc
            example: 'Plan to low weight quickly', // example of a title
          },

          description: {
            type: 'string', // data-type
            description: "Quoter's description", // desc
            example: 'This plan have all products to get results', // example of a title
          },

          idUser: {
            type: 'string', // data-type
            description: 'UUID number', // desc
            example: 'e7f5e4cf-f8df-4b95-b56e-56b9b17398p9', // example of an id
          },

          image: {
            type: 'string', // data-type
            description: "Quoter's image URL", // desc
            example: 'https://www.urlimage.com', // example of a title
          },
        },
      },

      // Quoter INPUT model
      quoterInput: {
        type: 'object', // data type
        properties: {
          title: {
            type: 'string', // data-type
            description: "Quoter's title", // desc
            example: 'Plan to low weight quickly', // example of a title
          },

          description: {
            type: 'string', // data-type
            description: "Quoter's description", // desc
            example: 'This plan have all products to get results', // example of a title
          },

          idUser: {
            type: 'string', // data-type
            description: 'UUID number', // desc
            example: 'e7f5e4cf-f8df-4b95-b56e-56b9b17398p9', // example of an id
          },

          image: {
            type: 'string', // data-type
            description: "Quoter's image URL", // desc
            example: 'https://www.urlimage.com', // example of a title
          },

          products: {
            type: 'array', // data type
            items: {
              $ref: '#/components/schemas/productInput',
            },
          },
        },
      },

      // Product model
      product: {
        type: 'object', // data type
        properties: {
          idProduct: {
            type: 'string', // data-type
            description: 'UUID number', // desc
            example: 'e5f5e4cf-f8df-4b95-b56e-56b9b17398d5', // example of an id
          },

          sku: {
            type: 'string', // data-type
            description: "Product's default code", // desc
            example: '4875', // example of a title
          },
          quantity: {
            type: 'number', // data-type
            description: "Products's quantity", // desc
            example: 4, // example of a title
          },

          quoterId: {
            type: 'string', // data-type
            description: "quoter's UUID number", // desc
            example: 'e7f5e4cf-f8df-4b95-b56e-56b9b17398p9', // example of an id
          },
        },
      },

      // Product Input Model
      productInput: {
        type: 'object', // data type
        properties: {
          sku: {
            type: 'string', // data-type
            description: "Product's default code", // desc
            example: '4875', // example of a title
          },
          quantity: {
            type: 'string', // data-type
            description: "Products's quantity", // desc
            example: 4, // example of a title
          },
        },
      },

      // handle error model
      errorProcess: {
        type: 'object', //data type
        properties: {
          errors: {
            type: 'array', // data type
            items: {
              type: 'object', //data type
              properties: {
                message: {
                  type: 'string', // data type
                  description: 'Error message', // desc
                  example: 'title is missing', // example of an error message
                },
                field: {
                  type: 'string', // data type
                  description: 'Information field from express-validator', // desc
                  example: 'title', // example of an error internal code
                },
              },
            },
          },
        },
      },

      errorCustomer: {
        type: 'object', //data type
        properties: {
          errors: {
            type: 'array', // data type
            items: {
              type: 'object', //data type
              properties: {
                message: {
                  type: 'string', // data type
                  description: 'Error message', // desc
                  example: 'title is missing', // example of an error message
                },
                field: {
                  type: 'string', // data type
                  description: 'Information field from express-validator', // desc
                  example: 'title', // example of an error internal code
                },
              },
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },

    responses: {
      deleteOk: {
        type: 'object', // data type
        properties: {
          message: {
            type: 'string', // data-type
            description: 'message', // desc
            example: 'delete ok', // example of an id
          },
          id: {
            type: 'string', // data-type
            description: 'id deleted', // desc
            example: '96bbda4b-3cbd-408f-b66c-e80a11ed246c', // example of a title
          },
        },
      },

      quoterResponse: {
        type: 'array', // data type
        items: {
          type: 'object', // data type
          properties: {
            id: {
              type: 'string', // data-type
              description: 'UUID number', // desc
              example: 'e5f5e4cf-f8df-4b95-b56e-56b9b17398d5', // example of an id
            },
            title: {
              type: 'string', // data-type
              description: "Quoter's title", // desc
              example: 'Plan to low weight quickly', // example of a title
            },

            description: {
              type: 'string', // data-type
              description: "Quoter's description", // desc
              example: 'This plan have all products to get results', // example of a title
            },

            image: {
              type: 'string', // data-type
              description: "Quoter's image URL", // desc
              example: 'https://www.urlimage.com', // example of a title
            },
            products: {
              type: 'array', // data type
              items: {
                $ref: '#/components/schemas/productInput',
              },
            },
          },
        },
      },

      updateImageResponse: {
        type: 'object', // data type
        properties: {
          id: {
            type: 'string', // data-type
            description: 'UUID number', // desc
            example: 'e5f5e4cf-f8df-4b95-b56e-56b9b17398d5', // example of an id
          },
          title: {
            type: 'string', // data-type
            description: "Quoter's title", // desc
            example: 'Plan to low weight quickly', // example of a title
          },

          description: {
            type: 'string', // data-type
            description: "Quoter's description", // desc
            example: 'This plan have all products to get results', // example of a title
          },

          image: {
            type: 'string', // data-type
            description: "Quoter's image URL", // desc
            example: 'https://www.urlimage.com', // example of a title
          },
        },
      },

      /*BadRequestError: {
                type: "object", //data type
                properties: {
                    errors: {
                        type: "array", // data type
                        items: {
                            type: "object", //data type
                            properties: {
                                message: {
                                    type: "string", // data type
                                    description: "Error message", // desc
                                    example: "<info backend>", // example of an error message
                                },

                            }
                        }
                    }
                }
            },*/
      InternalServerError: {
        type: 'object', //data type
        properties: {
          errors: {
            type: 'array', // data type
            items: {
              type: 'object', //data type
              properties: {
                message: {
                  type: 'string', // data type
                  description: 'Error message', // desc
                  example: '<info backend> + Internal Server Error', // example of an error message
                },
              },
            },
          },
        },
      },
      AuthError: {
        type: 'object', //data type
        properties: {
          errors: {
            type: 'array', // data type
            items: {
              type: 'object', //data type
              properties: {
                message: {
                  type: 'string', // data type
                  description: 'Error message', // desc
                  example: '<info backend> + Auth Error', // example of an error message
                },
              },
            },
          },
        },
      },
      ForbidenError: {
        type: 'object', //data type
        properties: {
          errors: {
            type: 'array', // data type
            items: {
              type: 'object', //data type
              properties: {
                message: {
                  type: 'string', // data type
                  description: 'Error message', // desc
                  example: '<info backend> + Forbidden Access', // example of an error message
                },
              },
            },
          },
        },
      },
      NotFoundError: {
        type: 'object', //data type
        properties: {
          errors: {
            type: 'array', // data type
            items: {
              type: 'object', //data type
              properties: {
                message: {
                  type: 'string', // data type
                  description: 'Error message', // desc
                  example: '<info backend> + Not Found', // example of an error message
                },
              },
            },
          },
        },
      },
      ServiceUnvailableError: {
        type: 'object', //data type
        properties: {
          errors: {
            type: 'array', // data type
            items: {
              type: 'object', //data type
              properties: {
                message: {
                  type: 'string', // data type
                  description: 'Error message', // desc
                  example: '<info backend> +  Service Unvailable', // example of an error message
                },
              },
            },
          },
        },
      },
      RequestValidationError: {
        type: 'object', //data type
        properties: {
          errors: {
            type: 'array', // data type
            items: {
              type: 'object', //data type
              properties: {
                message: {
                  type: 'string', // data type
                  description: 'Error message', // desc
                  example: 'idUser must be UUID', // example of an error message
                },
                field: {
                  type: 'string', // data type
                  description: 'Error message', // desc
                  example: 'idUser', // example of an error message
                },
              },
            },
          },
        },
      },
      /*UploadFileError: {
                type: "object", //data type
                properties: {
                    errors: {
                        type: "array", // data type
                        items: {
                            type: "object", //data type
                            properties: {
                                message: {
                                    type: "string", // data type
                                    description: "Error message", // desc
                                    example: "<info backend> + file error", // example of an error message
                                },

                            }
                        }
                    }
                }

            },*/
    },
  },
};
