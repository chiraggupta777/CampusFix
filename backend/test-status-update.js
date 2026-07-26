const http = require('http');

// First, login as student to create an issue
const studentLoginData = JSON.stringify({
  email: 'test@bbdu.ac.in',
  password: 'test123456'
});

const studentLoginOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(studentLoginData)
  }
};

const studentLoginReq = http.request(studentLoginOptions, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('Student login response status:', res.statusCode);
      
      if (response.token) {
        const studentToken = response.token;
        console.log('Student token obtained');
        
        // Create a test issue
        createTestIssue(studentToken);
      } else {
        console.log('Student login failed');
      }
    } catch (e) {
      console.log('Student login failed:', e.message);
    }
  });
});

studentLoginReq.on('error', (e) => {
  console.log('Student login request error:', e.message);
});

studentLoginReq.write(studentLoginData);
studentLoginReq.end();

function createTestIssue(token) {
  const issueData = JSON.stringify({
    title: 'Test Issue for Status Update',
    description: 'This is a test issue to verify status update functionality',
    category: 'Plumbing',
    location: 'Hostel A',
    images: []
  });

  const issueOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/issues',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(issueData)
    }
  };

  console.log('\nCreating test issue...');

  const issueReq = http.request(issueOptions, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Create issue response status:', res.statusCode);
      
      if (res.statusCode === 201) {
        const response = JSON.parse(data);
        console.log('Issue created with ID:', response.issue._id);
        console.log('Initial status:', response.issue.status);
        
        // Test status update
        testStatusUpdate(response.issue._id);
      } else {
        console.log('Failed to create issue');
      }
    });
  });

  issueReq.on('error', (e) => {
    console.log('Create issue request error:', e.message);
  });

  issueReq.write(issueData);
  issueReq.end();
}

function testStatusUpdate(issueId) {
  // Test with student token first to verify authorization (should get 403)
  console.log('\nTesting authorization with student token (should return 403)...');
  testUpdateWithStudent(issueId);
}

function testUpdateWithStudent(issueId) {
  const studentLoginData = JSON.stringify({
    email: 'test@bbdu.ac.in',
    password: 'test123456'
  });

  const studentLoginOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(studentLoginData)
    }
  };

  const studentLoginReq = http.request(studentLoginOptions, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.token) {
          const studentToken = response.token;
          updateIssueStatus(studentToken, issueId);
        }
      } catch (e) {
        console.log('Student login failed:', e.message);
      }
    });
  });

  studentLoginReq.on('error', (e) => {
    console.log('Student login request error:', e.message);
  });

  studentLoginReq.write(studentLoginData);
  studentLoginReq.end();
}

function updateIssueStatus(token, issueId) {
  const statusData = JSON.stringify({
    status: 'In Progress',
    adminRemark: 'Admin is reviewing this issue'
  });

  const updateOptions = {
    hostname: 'localhost',
    port: 5000,
    path: `/api/admin/issues/${issueId}/status`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(statusData)
    }
  };

  console.log(`\nTesting PATCH /api/admin/issues/${issueId}/status...`);

  const updateReq = http.request(updateOptions, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Update status response status:', res.statusCode);
      console.log('Update status response:', data);
      
      if (res.statusCode === 200) {
        const response = JSON.parse(data);
        console.log('\n✓ Status update endpoint working correctly');
        console.log('Updated issue:', JSON.stringify(response.issue, null, 2));
      } else {
        console.log('\n✗ Status update endpoint failed');
      }
    });
  });

  updateReq.on('error', (e) => {
    console.log('Update status request error:', e.message);
  });

  updateReq.write(statusData);
  updateReq.end();
}
