// Using built-in fetch in Node.js 18+

const BASE_URL = 'http://localhost:3001/api/gpt/faq';

async function testEndpoints() {
  console.log('🧪 Starting API Endpoints Verification...');

  try {
    // 1. Test Health Check
    console.log('\nTesting /health...');
    const healthRes = await fetch('http://localhost:3001/health');
    const healthData = await healthRes.json();
    console.log('Status Code:', healthRes.status);
    console.log('Response:', JSON.stringify(healthData));

    // 2. Test FAQ Version
    console.log('\nTesting GET /faq/version...');
    const versionRes = await fetch(`${BASE_URL}/version`);
    const versionData = await versionRes.json();
    console.log('Status Code:', versionRes.status);
    console.log('Response:', JSON.stringify(versionData));

    // 3. Test GET All FAQs
    console.log('\nTesting GET /faq/all...');
    const allRes = await fetch(`${BASE_URL}/all`);
    const allData = await allRes.json();
    console.log('Status Code:', allRes.status);
    console.log('Total FAQs:', allData.total);
    console.log('First FAQ Item:', JSON.stringify(allData.data[0]));

    // 4. Test POST Unknown Question
    console.log('\nTesting POST /faq/unknown...');
    const unknownRes = await fetch(`${BASE_URL}/unknown`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: 'Bagaimana cara mengurus surat aktif kuliah?',
        session_id: 'sess_123456',
        user_id: 'user_789'
      })
    });
    const unknownData = await unknownRes.json();
    console.log('Status Code:', unknownRes.status);
    console.log('Response:', JSON.stringify(unknownData));

    console.log('\n🎉 All API endpoints verified successfully!');
  } catch (error) {
    console.error('❌ Verification failed:', error);
  }
}

testEndpoints();
