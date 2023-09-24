const redisClient = require("redis").createClient("redis://default:ZyoX59MmP1GfdWYVelPZ1jWEGRz8McaG@redis-12292.c10.us-east-1-4.ec2.cloud.redislabs.com:12292",
{
    dialect:"postgres",
        
})

async function connectToRedis(){
    await redisClient.connect().then(()=> console.log("ligado ao redis"))
    redisClient.on("error", (error)=> console.log(error))
}

connectToRedis()


module.exports = redisClient