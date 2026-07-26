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
        console.log('Student login failed, trying admin login directly');
        testAdminGetIssueById(null);
      }
    } catch (e) {
      console.log('Student login failed:', e.message);
      testAdminGetIssueById(null);
    }
  });
});

studentLoginReq.on('error', (e) => {
  console.log('Student login request error:', e.message);
  testAdminGetIssueById(null);
});

studentLoginReq.write(studentLoginData);
studentLoginReq.end();

function createTestIssue(token) {
  const issueData = JSON.stringify({
    title: 'Test Issue for Admin',
    description: 'This is a test issue to verify admin single issue retrieval',
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
        
        // Now test admin endpoint to get this specific issue
        testAdminGetIssueById(response.issue._id);
      } else {
        console.log('Failed to create issue, trying with existing issues');
        testAdminGetIssueById(null);
      }
    });
  });

  issueReq.on('error', (e) => {
    console.log('Create issue request error:', e.message);
    testAdminGetIssueById(null);
  });

  issueReq.write(issueData);
  issueReq.end();
}

function testAdminGetIssueById(issueId) {
  // If no specific issue ID, first get all issues to find one
  if (!issueId) {
    console.log('\nNo specific issue ID, fetching all issues first...');
    fetchAllIssuesThenGetOne();
    return;
  }

  // Test with student token first to verify authorization (should get 403)
  console.log('\nTesting authorization with student token (should return 403)...');
  testGetIssueByIdWithStudent(issueId);
}

function testGetIssueByIdWithStudent(issueId) {
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
          testGetIssueById(studentToken, issueId);
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

function fetchAllIssuesThenGetOne() {
  const adminLoginData = JSON.stringify({
    email: 'warden@bbdu.ac.in',
    password: 'admin123456'
  });

  const adminLoginOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(adminLoginData)
    }
  };

  const adminLoginReq = http.request(adminLoginOptions, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.token) {
          const adminToken = response.token;
          
          // Get all issues first
          const getAllOptions = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/admin/issues',
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${adminToken}`
            }
          };

          const getAllReq = http.request(getAllOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
              if (res.statusCode === 200) {
                const response = JSON.parse(data);
                if (response.issues && response.issues.length > 0) {
                  const firstIssueId = response.issues[0]._id;
                  console.log('Found issue ID:', firstIssueId);
                  testGetIssueById(adminToken, firstIssueId);
                } else {
                  console.log('No issues found in database');
                }
              } else {
                console.log('Failed to get all issues');
              }
            });
          });

          getAllReq.on('error', (e) => {
            console.log('Get all issues request error:', e.message);
          });

          getAllReq.end();
        }
      } catch (e) {
        console.log('Admin login failed:', e.message);
      }
    });
  });

  adminLoginReq.on('error', (e) => {
    console.log('Admin login request error:', e.message);
  });

  adminLoginReq.write(adminLoginData);
  adminLoginReq.end();
}

function testGetIssueById(token, issueId) {
  const getIssueOptions = {
    hostname: 'localhost',
    port: 5000,
    path: `/api/admin/issues/${issueId}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  console.log(`\nTesting GET /api/admin/issues/${issueId}...`);

  const getIssueReq = http.request(getIssueOptions, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('Get issue by ID response status:', res.statusCode);
      console.log('Get issue by ID response:', data);
      
      if (res.statusCode === 200) {
        const response = JSON.parse(data);
        console.log('\n✓ Admin single issue endpoint working correctly');
        console.log('Issue details:', JSON.stringify(response.issue, null, 2));
      } else if (res.statusCode === 404) {
        console.log('\n✗ Issue not found (404)');
      } else {
        console.log('\n✗ Admin single issue endpoint failed');
      }
    });
  });

  getIssueReq.on('error', (e) => {
    console.log('Get issue by ID request error:', e.message);
  });

  getIssueReq.end();
}
