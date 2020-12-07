import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
});

export const config = {
    api: {
        bodyParser: true
    }
};

export default async function infoRegister(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST' && req.body) {
        const data = req.body;
        const info = await transporter.sendMail({
            from: `"Secretarium Website" <${process.env.MAILER_USER}>`,
            replyTo: `"No Reply" <${process.env.MAILER_USER}>`,
            to: process.env.MAILER_DESTINATION,
            subject: 'Secretarium - Documents request',
            text: `${JSON.stringify(data, null, 4)}`,
            html: `<pre>${JSON.stringify(data, null, 4)}</pre>`
        });

        return res.status(200).json({ message: 'Registration successful', info });
    }

    res.status(404);
    res.end();
}
