const mongoose = require('mongoose')

const isValidValue = (value) => {
    if (typeof value === "undefined" || value === null)
        return false;
    if (typeof value === "string" && value.trim().length === 0) 
        return false;
    return true;
};

const isvalidContact = function (phone) {
    phone = phone.trim()
    let regexForphone = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
    return regexForphone.test(phone)
};

const isValidUrl =function(url){
    url = url.trim()
    let regexForUrl = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
    return regexForUrl.test(url)
    
    
}
// const isValidEmail = function(emailId){
//     emailId = emailId.trim()
//     let regexForEmail = !/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
//     return regexForEmail.test(emailId)
// }

const isValidObjectId = (objectId) => mongoose.Types.ObjectId.isValid(objectId)

const isValidDetails = (requestBody) => Object.keys(requestBody).length > 0;


module.exports={isValidValue,isValidDetails,isvalidContact,isValidObjectId,isValidUrl}