
const  { createClient } = require('redis') ;

const client = createClient({
    password: 'ZyoX59MmP1GfdWYVelPZ1jWEGRz8McaG',
    socket: {
        host: 'redis-12292.c10.us-east-1-4.ec2.cloud.redislabs.com',
        port: 12292
    }
});

async function connectToRedis(){
    await client.connect().then(()=> console.log("ligado ao redis"))
    client.on("error", (error)=> console.log(error))
}

connectToRedis()


module.exports = client