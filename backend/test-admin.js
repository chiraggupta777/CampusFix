const http = require('http');

// Test admin login with warden account
const loginData = JSON.stringify({
  email: 'warden@bbdu.ac.in',
  password: 'admin123456'
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
      console.log('Login response status:', res.statusCode);
      console.log('Login response:', response);
      
      if (response.token) {
        const token = response.token;
        console.log('Token obtained:', token.substring(0, 20) + '...');
        
        // Test admin endpoint to get all issues
        testGetAllIssues(token);
      } else {
        console.log('No token in response');
      }
    } catch (e) {
      console.log('Login failed:', e.message);
    }
  });
});

loginReq.on('error', (e) => {
  console.log('Login request error:', e.message);
});

loginReq.write(loginData);
loginReq.end();

function testGetAllIssues(token) {
  const getAllIssuesOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/issues',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  console.log('\nTesting GET /api/admin/issues...');

  const getAllIssuesReq = http.request(getAllIssuesOptions, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Get all issues response status:', res.statusCode);
      console.log('Get all issues response:', data);
      
      if (res.statusCode === 200) {
        const response = JSON.parse(data);
        console.log('\n✓ Admin endpoint working correctly');
        console.log('Total issues:', response.count);
        if (response.issues && response.issues.length > 0) {
          console.log('Sample issue:', JSON.stringify(response.issues[0], null, 2));
        }
      } else {
        console.log('\n✗ Admin endpoint failed');
      }
    });
  });

  getAllIssuesReq.on('error', (e) => {
    console.log('Get all issues request error:', e.message);
  });

  getAllIssuesReq.end();
}
