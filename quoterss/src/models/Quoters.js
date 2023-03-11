require('dotenv').config();

const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Model= Sequelize.Model;


const config = require('config');
const dbConfig = config.get('database'); //database is into file /config/index

class Quoter extends Model {}

Quoter.init(
    {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        title: Sequelize.STRING(60),
        description: Sequelize.STRING(60), 
        idUser: Sequelize.UUID,
        image:{
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "",
        },
    },
    {
        sequelize,
        //tableName:  dbConfig.username, 
        modelName: 'quoter',
    }
)


Quoter.prototype.toJSON =  function () {
    let values = Object.assign({}, this.get());
    delete values.createdAt;
    delete values.updatedAt;
    delete values.idUser;
    return values; 
}



module.exports= Quoter;