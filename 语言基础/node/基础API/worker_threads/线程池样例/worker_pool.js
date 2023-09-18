const { EventEmitter } = require('node:events');
const { Worker } = require('node:worker_threads');
const os = require('node:os');
const TaskInfo = require('./task_info');
const kTaskInfo = Symbol('kTaskInfo');
const kWorkerFreedEvent = Symbol('kWorkerFreedEvent');

class WorkerPool extends EventEmitter {
    constructor () {
        super()
        this.numThreads = os.cpus().length
        this.workers = []
        this.freeWorkers = []
        this.tasks = []
        this._initWorkers()
        this._bindWorkerFreedEvent()
        console.log(`max threads: ${this.numThreads}`)
    }
    _bindWorkerFreedEvent () {
        this.on(kWorkerFreedEvent, () => {
            if (this.tasks.length > 0) {
                const { task, callback } = this.tasks.shift()
                this.runTask(task, callback);
            }
        })
    }
    _initWorkers () {
        for (let i = 0; i < this.numThreads; i++) this.addNewWorker()
    }
    _workerErrorEvent (worker, err) {
        if (worker[kTaskInfo]) worker[kTaskInfo].done(err, null)
        else this.emit('error', err)
        this.workers.splice(this.workers.indexOf(worker), 1)
        this.addNewWorker()
    }
    _workerCallbackEvent (worker, result) {
        worker[kTaskInfo].done(null, result)
        worker[kTaskInfo] = null
        this._workerToIdle(worker)
    }
    _workerToIdle (worker) {
        this.freeWorkers.push(worker)
        this.emit(kWorkerFreedEvent)
    }

    addNewWorker () {
        const worker = new Worker('./job.js')
        worker.on('message', result => this._workerCallbackEvent(worker, result))
        worker.on('error', err => this._workerErrorEvent(worker, err))
        this.workers.push(worker)
        this._workerToIdle(worker)
    }
    runTask (task, callback) {
        if (this.freeWorkers.length === 0) {
            // No free threads, wait until a worker thread becomes free.
            return this.tasks.push({ task, callback })
        }
    }

    close () {
        for (const worker of this.workers) worker.terminate()
    }
}

module.exports = WorkerPool