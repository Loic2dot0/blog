const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: process.env.DB_LOG === 'ENABLED' ? console.log : false,
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_bin'  // case sensitive
        }
    }
);

sequelize.authenticate()
    .then(() => {
        sequelize.sync()
            .then(()=>console.log('All models were synchronized successfully !'))
            .catch((error)=> console.log(error)); 
    })
    .catch((error)=> console.log(`Failed to access database : ${error}`));

module.exports = sequelize;