
const  { createClient } = require('redis') ;
/*
const client = createClient();
*/


const client = createClient(
    {
    password: 'WCfq3liIiJu1qYdtBa2pJW6ERSCAw6Vi',
    socket: {
        host: 'redis-14598.c322.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14598
    }
}
);


async function connectToRedis(){
    await client.connect().then(()=> console.log("ligado ao redis"))
    client.on("error", (error)=> console.log(error))
}


connectToRedis()


module.exports = client