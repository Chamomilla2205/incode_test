module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'incode',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['dist/src/migrations/*.js'],
  synchronize: false,
  logging: ['error', 'query'],
  timezone: 'Z'
};