import formData from 'form-data';
import Mailgun from 'mailgun.js';
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY as string,
});

export default async function sendHtml(emails: any, subject = '', body = ``) {
    emails = Array.isArray(emails) ? emails : emails.split(',');
    return body.includes('<title>')
        ? mg.messages.create(process.env.MAILGUN_DOMAIN as string, {
            from: '"Xportt" <hi@xportt.com>',
            to: [...emails],
            subject,
            html: body,
        })
        : mg.messages.create(process.env.MAILGUN_DOMAIN as string, {
            from: '"Xportt" <hi@Xportt.com>',
            to: [...emails],
            subject,
            text: body,
        });
}
export { mg };
