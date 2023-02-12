const { AsyncResource } = require('node:async_hooks')
class TaskInfo extends AsyncResource {
    constructor (callback) {
        super('TaskInfo')
        this.callback = callback
    }
    done (err, result) {
        this.runInAsyncScope(this.callback, null, err, result)
        this.emitDestroy()
    }
}
module.exports = TaskInfo