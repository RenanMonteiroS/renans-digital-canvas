import nodemailer from 'nodemailer';

export const onRequestPost = async(context) => {
    
    const url = new URL(context.request.url);

    if (url.pathname === '/api/send-email') {
        try {

            const body = await context.request.json();
            const { name, email, message } = body;

            if (!name || !email || !message) {
                return new Response(JSON.stringify({ 
                    message: 'Missing required fields: name, email, or message' 
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'renanmonteirodes@gmail.com',
                    pass: 'aaaa'
                },
            });

            const mailOptions = {
            from: `Portfolio Contact <${EMAIL_USER}>`,
            to: EMAIL_USER,
            subject: `Portfolio Contact from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                
                Message:
                ${message}
            `,
            html: `
                <h2>New contact from your portfolio</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
            };

            await transporter.sendMail(mailOptions);
            return new Response(JSON.stringify({message: `E-mail sent`}, {
                status: 200,
            }));

        } catch (error) {
            return new Response(JSON.stringify({message: `An error has occurred: ${error}`}, {
                status: 500,
            }));
        }
    }
};