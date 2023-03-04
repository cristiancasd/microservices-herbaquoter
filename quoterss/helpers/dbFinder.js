
const Quoter = require("../src/models/Quoters");


const titleQuoterByUserExist = async (title, idUser, idQuoter = undefined) => {
  const quoterTitleExist = await Quoter.findAll({ where: { title: title, idUser: idUser } });

  if (!idQuoter)
    return (quoterTitleExist[0])
      ? true
      : false


  if (quoterTitleExist[0]) {
    console.log('Estoy en update')
    return (quoterTitleExist[0].dataValues.id === idQuoter)
      ? false
      : true;
  } else {
    return false
  }
}

module.exports = {
  titleQuoterByUserExist,
}