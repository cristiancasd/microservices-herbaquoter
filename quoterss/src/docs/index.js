const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const quoters = require('./quoters');




module.exports = {
    ...basicInfo,
    ...servers,
    ...tags,
    ...components,
    ...quoters,
    /*security:{
     bearerAuth: []   
}*/
};