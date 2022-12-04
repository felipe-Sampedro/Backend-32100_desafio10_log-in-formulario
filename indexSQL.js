const SQLClient = require('./db/clients/sql.clients')
const dbConfig = require('./db/config')

const mariaDB = new SQLClient(dbConfig.mariaDB)

mariaDB.creatTable("productos")
    .then(()=>{
        console.log('created');
        const products = [
            {nombre: "navaja",
            precio: 180000,
            imagen: "https://cdn.shopify.com/s/files/1/0321/2548/5192/products/1_3613__s1_45949_eps_1_300x300.jpg?v=1583343912"
            },
            {nombre: "cuerda",
            precio: 28000,
            imagen: "https://www.suescalada.com/176-large_default/bwii-105-mm-cuerda-estatica-bluewater.jpg"
            }];
        return mariaDB.insertRecords("productos", products);
    })
    .then((records) => {
        console.log("pronto");
        console.table(records);
    })
    .then(()=>{
        return mariaDB.getRecords("productos");
    })
    .then((records)=>{
        console.table(records);
    })
    .catch((error)=> console.log(error.message))
    .finally(()=>{mariaDB.disconnect()});

