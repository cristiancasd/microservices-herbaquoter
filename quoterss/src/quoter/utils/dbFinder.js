const Quoter = require('../Quoters');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const titleQuoterByUserExist = async (title, idUser, idQuoter = undefined) => {
  const quoterTitleExist = await Quoter.findAll({
    // where: { title: '%title%', idUser: idUser }

    //Find with lower case
    where: {
      [Op.and]: [
        { where: sequelize.where(sequelize.fn('lower', sequelize.col('title')), sequelize.fn('lower', title)) },
        { idUser },
      ],
    },
  });

  if (!idQuoter) return quoterTitleExist[0] ? true : false;

  if (quoterTitleExist[0]) {
    console.log('Estoy en update');
    return quoterTitleExist[0].dataValues.id === idQuoter ? false : true;
  } else {
    return false;
  }
};

module.exports = {
  titleQuoterByUserExist,
};
