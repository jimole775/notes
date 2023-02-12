const WorkerPool = require('./worker_pool.js')
const pool = new WorkerPool()
const max = 10000
const startTime = new Date().getTime()
let finished = 0
for (let i = 0; i < max; i++) {
    pool.runTask({ a:42, b: 100 }, (err, result) => {
        console.log(i, result)
        if (++finished === max) {
            const nowTime = new Date().getTime()
            console.log(`workers was cost time when they runs ${max} tasks:`, nowTime - startTime)
            pool.close()
        }
    })
}
