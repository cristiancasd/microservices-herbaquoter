const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Quoter = require('./Quoters');

const Model= Sequelize.Model;

class Product extends Model {}

Product.init(
    {
        idProduct:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        sku: Sequelize.STRING(10),
        quantity: Sequelize.INTEGER,
        quoterId: {
            type: Sequelize.UUID,
            references : {
              model : Quoter,
              key : 'id'
            },
            onDelete: 'CASCADE',
        }, 
    },
    {
        sequelize,
        modelName: 'product',
        instanceMethods: {
            toJSON: function () {
                const productObj = Object.assign({}, this.dataValues);  
                delete productObj.title;  
                return productObj
            }
      }
    }
)

/**/
Product.belongsTo(Quoter, {
    foreignKey: "quoterId",
    as: "quoter"
  }); 

Quoter.hasMany(Product, { as: "products" });


/*
Product.prototype.toJSON =  function () {
    let values = Object.assign({}, this.get());
    delete values.createdAt;
    delete values.updatedAt;
    delete values.quoterId;
    delete values.id;
    return values;
}

*/


module.exports= Product;