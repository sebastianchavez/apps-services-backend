module.exports = {
    MESSAGES: {
        ERROR: {
          DEFAULT_MESSAGE: 'En estos momentos existen dificultades, intente mas tarde',
          QUERY_ERROR: 'Error al ejecutar consulta'
        },
        SUCCESS: {
    
        }
      },
      SERVER: {
        MONGODB_URI: 'mongodb://localhost/dbtest',
        PORT: 3003,
        S3: {
          URL: '',
          S3_ACCESS_KEY_ID: '',
          S3_SECRET_ACCESS_KEY: '',
          S3_BUCKET: '',
          S3_BUCKET_KEY: '',
          ACL: 'public-read'
        },
        EMAIL: {
          service: 'webmail',
          host: '',
          port: 465,
          auth: {
            user: '',
            pass: '.'
          },
          from: ''
        },
      },
}