const os = require('os')

let totalMemory = (os.totalmem() / 1024**3);
let freeMemory = os.freemem() /  1024**3
// console.log(`Total memory is: ${totalMemory.toFixed(2)}`)
// console.log(`Free memory is: ${freeMemory.toFixed(2)}`)
let cpuInfo = os.cpus();
// console.log(cpuInfo)
// console.log(os.hostname());
// console.log(os.machine())
// console.log(os.networkInterfaces())
// console.log(os.platform())
// console.log(os.tmpdir())
// console.log(os.platform())
// console.log((os.uptime() / 60).toFixed(0))
console.log(os.userInfo())