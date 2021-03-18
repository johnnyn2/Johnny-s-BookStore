<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
    <p>Dear ${name},</p>
    <p>Your payment has been completed. Thank you for your order.</p>
    <div>
      <p>Ordered Items: </p>
      <table>
        <thead>
          <tr><th>Title</th><th>Price</th></tr>
        </thead>
        <tbody>
          <#list items as item>
            <tr><td>${item.title}</td><td>${item.price}</td></tr>
          </#list>
        </tbody>
      </table>
    </div>
    <h5>Total: ${amount}</h5>
    <p>Regards,</p>
    <p>${sender}</p>
  </body>
</html>