class Fire {
    constructor(){
        this.draw();
    }
    type() { }
    color() { }
    size() { }
    life() { } // 存活时间
    hitting() { } //需要实现撞击产生的火花
    flame() { } //燃烧状态
    draw() { } //绘制流程
}

export default Fire;