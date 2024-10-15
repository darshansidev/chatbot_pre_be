const { Joi } = require('express-validation');
const JoiObjectId = require('joi-objectid');
Joi.objectId = JoiObjectId(Joi);


const createSignupPayload = {
    body: Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        contactNo: Joi.number().integer().min(1000000000).max(9999999999)
            .messages({
                'number.base': 'Contact number must be a number',
                'number.integer': 'Contact number must be an integer',
                'number.min': 'Contact number must have 10 digits',
                'number.max': 'Contact number must have 10 digits',
            })
            .required()
    })
};

const loginUserPayload = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

module.exports = { createSignupPayload, loginUserPayload }


