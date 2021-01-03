module.exports = ({ env }) => ({
    email: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME', "group06onlineacademy@gmail.com"),
          pass: env('SMTP_PASSWORD', "onlineacademy06"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: 'group06onlineacademy@gmail.com',
        defaultReplyTo: 'group06onlineacademy@gmail.com',
      },
    },
  });