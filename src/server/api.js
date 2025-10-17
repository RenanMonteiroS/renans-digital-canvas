
import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../dist')));

// Email configuration - replace with your app password
const EMAIL_USER = 'renanmonteirodes@gmail.com';
const EMAIL_APP_PASSWORD = 'mwsj ezws jhza cohb'; // Replace with your Gmail App Password
// Email sending endpoint
/* app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // Create nodemailer transport with standard SMTP authentication
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD, // App password from Google Account
      },
    });
    
    // Email content
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
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
  }
}); */

// Webhook message endpoint - secure backend proxy
app.post('/api/webhook-message', async (req, res) => {
  const { content, origin, userIP, sessionId } = req.body;
  
  try {
    // Make the webhook call from backend (secure)
    const webhookResponse = await fetch('http://docker-compose-n8n-1:5678/webhook/n8n_portfolio_invoker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        content,
        origin,
        userIP,
        sessionId
      }),
    });
    
    const data = await webhookResponse.json();
    
    res.status(200).json({ 
      success: true, 
      output: data.output || data 
    });
  } catch (error) {
    console.error('Error calling webhook:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing message', 
      error: error.message 
    });
  }
});

// For any other request, serve the main index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
