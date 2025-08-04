const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create a test account using Ethereal Email (for development)
const createTestAccount = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error('Error creating test account:', error);
    return null;
  }
};

// Send email confirmation
router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, orderId, items, totalPrice, customerDetails } = req.body;

    // Create transporter
    const transporter = await createTestAccount();
    
    if (!transporter) {
      return res.status(500).json({ message: 'Failed to create email transporter' });
    }

    // Create email HTML content
    const itemsList = items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">₹${item.price}</td>
      </tr>
    `).join('');

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .items-table th { background: #f5f5f5; padding: 10px; text-align: left; }
          .total { font-size: 18px; font-weight: bold; text-align: right; padding: 20px; background: #f0f8ff; border-radius: 5px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍽️ Campus Canteen</h1>
            <p>Order Confirmation</p>
          </div>
          <div class="content">
            <h2>Thank you for your order!</h2>
            <p>Dear ${customerDetails.name},</p>
            <p>Your order has been successfully placed and is being prepared. Here are your order details:</p>
            
            <div class="order-details">
              <h3>Order Information</h3>
              <p><strong>Order ID:</strong> #${orderId}</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Delivery Address:</strong> ${customerDetails.address}</p>
              <p><strong>Phone:</strong> ${customerDetails.phone}</p>
              <p><strong>Payment Method:</strong> ${customerDetails.paymentMethod}</p>
            </div>

            <h3>Order Items</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>

            <div class="total">
              <strong>Total Amount: ₹${totalPrice}</strong>
            </div>

            <p>Your order will be ready shortly. You will receive a notification when it's ready for pickup or delivery.</p>
            
            <p>If you have any questions, please contact us at support@campus-canteen.com</p>
          </div>
          <div class="footer">
            <p>© 2024 Campus Canteen. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: '"Campus Canteen" <noreply@campus-canteen.com>',
      to: to,
      subject: subject,
      html: emailHTML,
    });

    console.log('Email sent successfully:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

    res.json({ 
      message: 'Email sent successfully',
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

module.exports = router; 