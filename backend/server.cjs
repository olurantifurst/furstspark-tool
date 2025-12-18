const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-strategy', async (req, res) => {
  const { email, name, businessName, industry, businessSummary, intro, actions } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Furst Spark <hello@furstsparkgroup.com>', 
      to: email,
      subject: `Your Customer Acquisition Strategy for ${businessName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2>Hi ${name || 'Founder'},</h2>
          
          <p><em>"I quit my managerial role at a top startup to build Furst Spark from 4 figures into a 7-figure company in just 2 years. Now I'm transforming it into a storytelling company to help 50,000 businesses like yours."</em></p>
          
          <p>Based on what you told me about <strong>${businessName}</strong>, here is your initial insight:</p>
          
          <blockquote style="background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px;">
            ${intro}
          </blockquote>

          <h3>Your 3 Quick-Win Actions:</h3>
          <ul>
            ${actions ? actions.map(action => `<li>${action}</li>`).join('') : '<li>No actions available yet</li>'}
          </ul>

          <p>We are preparing your full 30-day blueprint and templates now. Keep an eye on your inbox!</p>
          
          <br>
          <p>Best regards,</p>
          <p><strong>The Furst Spark Team</strong><br>
          <a href="https://furstsparkgroup.com">furstsparkgroup.com</a></p>
        </div>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));