import { Sequelize } from "sequelize";
const db = new Sequelize('cqadb', 'azureuser', '1234', {
   host: "localhost",
   dialect: "postgres"
});
export default db;


//use sequelize auto for models