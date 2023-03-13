import nodemailer from 'nodemailer'
import validator from 'validator'
const config = useRuntimeConfig()

const transporter = nodemailer.createTransport({
	serivce: config.MAIL_SERVICE,
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
	auth: {
		user: config.MAIL_USER,
		pass: config.MAIL_PASSWORD,
	},
})

const isValid = async (body) => {
    const errors = []
    if(validator.isEmpty(body.email || '')) 
        errors.push({ field: 'email', error: 'Field is required' })
    if(validator.isEmpty(body.subject || '')) 
        errors.push({ field: 'subject', error: 'Field is required' })
    if(validator.isEmpty(body.message || '')) 
        errors.push({ field: 'message', error: 'Field is required' })
    if(!validator.isEmail(body.email || '')) 
        errors.push({ field: 'email', error: 'Field must be valid Email' })

    if(errors.length > 0)
        return Promise.reject(errors)
    else
        return Promise.resolve({
            email: validator.normalizeEmail(body.email),
            subject: validator.escape(body.subject),
            message: validator.escape(body.message)
        })
}

export default defineEventHandler(async (event, response) => {
    try {
        const body = await readBody(event)
        await isValid(body).then(async (data) => {
            await transporter.sendMail({
                form: `Le Wind <${data.email}>`,
                to: config.MAIL_CONTACT,
                subject: data.subject,
                text: data.message,
                html: data.message,
            })
            return Promise.resolve()
        }).catch((errors) => {
            return Promise.reject(errors)
        })
        return "Success"
    } catch(error) {
        console.log(error)
        sendError(event, createError({ statusCode: 400, statusMessage: error }))
    }
 })