module.exports = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'zxcvbnm123',
	database: 'node_form',
	logging: false,
	synchronize: true,
	entities:['src/**/**.entity{.ts,.js}'],
	timezone: 'Z',
	dateStrings: 'DATETIME'
}