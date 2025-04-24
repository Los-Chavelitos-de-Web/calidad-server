module.exports = {
    preset: 'ts-jest',
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.json', // Asegúrate de que Jest use el archivo tsconfig correcto
      },
    },
    testEnvironment: 'node',
  };
  