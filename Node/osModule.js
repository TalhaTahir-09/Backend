const os = require('os');

let totalMemory = os.totalmem() / 1024 ** 3; // total RAM in GB
let freeMemory = os.freemem() / 1024 ** 3;   // free RAM in GB

let cpuInfo = os.cpus();// CPU details
console.log(cpuInfo);

console.log(os.hostname()); // system name
console.log(os.machine()); // CPU architecture (cores and name)
console.log(os.networkInterfaces());// network info (ethernet, wift, Ips)
console.log(os.platform());// OS platform (win32, posix etx)
console.log(os.tmpdir());// temporary files path 
console.log((os.uptime() / 60).toFixed(0)); // uptime in mins
console.log(os.userInfo()); // current user info
