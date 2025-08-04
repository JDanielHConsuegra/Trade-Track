const axios = require('axios');

// Datos de prueba
const testData = {
  username: 'testuser',
  email: 'test@example.com',
  password: '123456'
};

// Función para probar registro
async function testRegister() {
  try {
    console.log('🔍 Probando registro con datos:', testData);
    
    const response = await axios.post('http://localhost:3001/auth/register', testData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    console.log('✅ Respuesta exitosa:', response.status);
    console.log('📄 Datos de respuesta:', response.data);
    
  } catch (error) {
    console.error('❌ Error en la petición:', error.response?.status, error.response?.data);
  }
}

testRegister(); 