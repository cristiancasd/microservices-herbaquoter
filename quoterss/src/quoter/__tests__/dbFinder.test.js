const { titleQuoterByUserExist } = require('../utils/dbFinder');

const { globalCreateQuoter, tokens, adminData } = require('../../test/setup-jest');

const { testData } = require('../../static/testData/testData');
const testDataPro = testData();
const { quoterCorrect } = testDataPro;

describe('quoters - utils - titleQuoterByUserExist', () => {
  it('should be return true: Title already exist in database by User', async () => {
    const { tokenAdmin } = tokens();
    const { title, id } = await globalCreateQuoter(quoterCorrect, tokenAdmin);
    const { id: idUser } = adminData();
    const response = await titleQuoterByUserExist(title, idUser);
    expect(response).toBe(true);
  });

  it('should be return true: Title already exist in database by User, with upper or lowercase', async () => {
    const { tokenAdmin } = tokens();
    const { title, id } = await globalCreateQuoter(quoterCorrect, tokenAdmin);
    const { id: idUser } = adminData();
    const response = await titleQuoterByUserExist(title.toUpperCase(), idUser);
    expect(response).toBe(true);
  });

  it('should be return false: Title exist in database by User BUT have the same id quoter (update quoter)', async () => {
    const { tokenAdmin } = tokens();
    const { title, id } = await globalCreateQuoter(quoterCorrect, tokenAdmin);
    const { id: idUser } = adminData();
    const response = await titleQuoterByUserExist(title, idUser, id);
    expect(response).toBe(false);
  });

  it('should be return false: Title dont exist in database by User', async () => {
    const { tokenAdmin } = tokens();
    const { title, id } = await globalCreateQuoter(quoterCorrect, tokenAdmin);
    const { id: idUser } = adminData();
    const response = await titleQuoterByUserExist('otro titulo', idUser);
    expect(response).toBe(false);
  });
});
