import { Sequelize } from "sequelize";

// const db = new Sequelize('nodejs_proyek_13', 'necronomicon',  '123456789', {
//     host: "localhost",
//     dialect: "postgres",
// });

// const db = new Sequelize('proyek_3', 'root', '',{
//     host: 'localhost',
//     dialect: 'mysql',
// });

const db = new Sequelize('postgres', 'postgres',  'necronomiconbookofdeadlevel3', {
    host: "db.rgmkgkncywrqhhijtwmn.supabase.co",
    dialect: "postgres",
});
export default db;