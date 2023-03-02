const { validationResult } = require("express-validator");
const { NotFoundError } = require("../errors/not-found-error");
const Quoter = require("../src/models/Quoters");

const quoterByIdExist= async (req,res,next)=>{
    const errors= validationResult(req);
    if(errors.isEmpty()){
        const {id}=req.params;
        const quoterExists = await Quoter.findOne({where: {id: id}});
        if (!quoterExists){
            const err= new NotFoundError('Id quoter in DB');
            return next(err)
        }
    }
    next()
}


const quotersByUserExist= async (req,res,next)=>{
    const errors= validationResult(req);
    if(errors.isEmpty()){
        const {idToDelete}=req.params;
        //console.log('en middleware quotersByUserExist', idToDelete)
        const quoterExists = await Quoter.findOne({where: {idUser: idToDelete}});
        //console.log(' response findOne ', quoterExists)
        if (!quoterExists){
            const err= new NotFoundError('Quoters with idUser');
            return next(err)
        }
    }
    next()
}




module.exports={
    quoterByIdExist,
    quotersByUserExist,
}