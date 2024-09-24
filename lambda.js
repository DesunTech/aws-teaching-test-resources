exports.handler = async (event) => {
  const message = 'Hello from Lambda!';
  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};

exports.handler = async (event) => {
  const s3Event = event.Records[0].s3;
  const bucket = s3Event.bucket.name;
  const objectKey = s3Event.object.key;

  console.log(`New file uploaded: ${objectKey} in bucket: ${bucket}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'File processed successfully!' }),
  };
};
