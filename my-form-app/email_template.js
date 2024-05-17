const emailTemplate = () => ` 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif">
    <table
      style="
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border-collapse: collapse;
        background-color: #ffffff;
      "
    >
      <tr>
        <td style="padding: 20px; text-align: center">
          <h2 style="color: #333333">Welcome to MediYaara!</h2>
          <p style="font-size: 16px; color: #292929">
            Tablet Time
          </p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          Take Tablet
        </td>
      </tr>
    </table>
  </body>
</html>

`;

module.exports = emailTemplate;