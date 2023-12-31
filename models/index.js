const { Sequelize, DataTypes, Model } = require('sequelize')

const sequelize = new Sequelize('employee', 'vineeta', 'Vin@12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

try {
  sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user')(sequelize, DataTypes, Model)
db.contact = require('./contact')(sequelize, DataTypes, Model)
db.task = require('./task')(sequelize, DataTypes)

// db.user.hasOne(db.contact);
// db.contact.belongsTo(db.user);

db.user.hasMany(db.contact, { foreignKey: 'userId', onDelete: 'CASCADE' })
db.contact.belongsTo(db.user, { foreignKey: 'userId' })
// db.task.belongsTo(db.user);

db.user.belongsToMany(db.contact, { through: 'user_contacts' })
db.contact.belongsToMany(db.user, { through: 'user_contacts' })

db.sequelize.sync({ force: false })

module.exports = db
