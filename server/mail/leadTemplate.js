export const leadTemplate = (name, email, phone, projectName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>Lead</title>
        <style>
          
        </style>
    </head>
    
    <body>
        <div>
        <h1>${projectName}</h1>
        <h2>Name: ${name}</h2>
        <p>Email: ${email}</p>
        <p>Phone Number: ${phone}</p>
        </div>
    </body>
    
    </html>
    `
}