// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'cohortsdb',
      username: 'vidwad',
      password: 'AshNatIsy1',
    },
    migrations: {
      directory: './db/migrations'
    }
  }
};
