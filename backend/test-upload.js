const fs = require('fs');
const http = require('http');

// Create a minimal PNG file (1x1 pixel)
const pngBuffer = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
  0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 dimensions
  0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
  0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, // IDAT chunk
  0x54, 0x08, 0xD7, 0x63, 0xF8, 0xCF, 0xC0, 0x00,
  0x00, 0x03, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, // IEND chunk
  0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
]);

fs.writeFileSync('test-image.png', pngBuffer);
console.log('Test image created');

// First, register a user, then login to get a valid token
const registerData = JSON.stringify({
  name: 'Test User',
  email: 'test@bbdu.ac.in',
  password: 'test123456',
  hostelBlock: 'A',
  roomNumber: '101'
});

const registerOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(registerData)
  }
};

const registerReq = http.request(registerOptions, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Register response status:', res.statusCode);
    console.log('Register response:', data);
    
    // Now login
    const loginData = JSON.stringify({
      email: 'test@bbdu.ac.in',
      password: 'test123456'
    });

    const loginOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    };

    const loginReq = http.request(loginOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('Login response:', response);
          
          if (response.token) {
            const token = response.token;
            console.log('Token obtained:', token.substring(0, 20) + '...');
            
            // Now upload the image
            uploadImage(token);
          } else {
            console.log('No token in response, trying upload without auth for testing...');
            uploadImage(null);
          }
        } catch (e) {
          console.log('Login failed, trying upload without auth for testing...');
          uploadImage(null);
        }
      });
    });

    loginReq.on('error', (e) => {
      console.log('Login request failed, trying upload without auth for testing...');
      uploadImage(null);
    });

    loginReq.write(loginData);
    loginReq.end();
  });
});

registerReq.on('error', (e) => {
  console.log('Register request failed, trying upload without auth for testing...');
  uploadImage(null);
});

registerReq.write(registerData);
registerReq.end();

function uploadImage(token) {
  // Manual multipart/form-data construction
  const boundary = '----WebKitFormBoundary' + Math.random().toString(16).substr(2);
  const imageBuffer = fs.readFileSync('test-image.png');
  
  const preBuffer = Buffer.from(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="images"; filename="test-image.png"\r\n` +
    `Content-Type: image/png\r\n\r\n`
  );
  
  const postBuffer = Buffer.from(`\r\n--${boundary}--\r\n`);
  
  const bodyBuffer = Buffer.concat([preBuffer, imageBuffer, postBuffer]);
  
  const uploadOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/upload/images',
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': bodyBuffer.length
    }
  };
  
  if (token) {
    uploadOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  console.log('Sending upload request...');

  const uploadReq = http.request(uploadOptions, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Upload response status:', res.statusCode);
      console.log('Upload response body:', data);
    });
  });

  uploadReq.on('error', (e) => {
    console.log('Upload request error:', e.message);
  });

  uploadReq.write(bodyBuffer);
  uploadReq.end();
}
