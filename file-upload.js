const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// AWS S3 Client Configuration
const s3 = new S3Client({
  region: 'YOUR_REGION', // e.g., 'us-east-1'
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  },
});

const bucketName = 'my-nodejs-image-upload-bucket'; // Your S3 bucket name

// Route to Upload an Image File to S3
app.get('/upload', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'image.jpg'); // Path to the image file
    const fileContent = fs.readFileSync(filePath); // Read the file content

    // Prepare the parameters for the upload
    const params = {
      Bucket: bucketName,
      Key: 'uploaded-image.jpg', // File name in S3
      Body: fileContent,
      ACL: 'public-read', // Make the file publicly accessible
      ContentType: 'image/jpeg',
    };

    // Upload the file to S3
    const command = new PutObjectCommand(params);
    await s3.send(command);

    // Generate a signed URL (Optional, if you want a signed URL instead of public access)
    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600,
    }); // URL expires in 1 hour

    // Send success response
    res.send(`File uploaded successfully. Access URL: ${signedUrl}`);
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Error uploading file');
  }
});

app.get('/', async (req, res) => {
  res.send('Hello World');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
