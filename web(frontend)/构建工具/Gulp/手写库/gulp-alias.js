/*
 * @Author: Rongxis 
 * @Date: 2019-08-17 10:59:34 
 * @Last Modified by:   Rongxis 
 * @Last Modified time: 2019-08-17 10:59:34 
 */
var path = require('path')
var through2 = require('through2')
/**
 *@params {alias:{}, dest:'', root:''}
 */
module.exports = function alias(params) {
    return through2.obj(function(file, encoding, cb){        
        var content = file._contents.toString()
        var alias = params.alias ? params.alias : {}
        var dest = params.dest ? params.dest : ''
        Object.keys(alias).forEach((aliasItem)=>{
            var realPath = alias[aliasItem]

            // 判断有没有分隔符
            realPath = /[\/\\]$/.test(realPath) ? realPath : realPath + '/'
            dest = /[\/\\]$/.test(dest) ? dest : dest + '/'

            // 动态创建正则
            var requireReg =  new RegExp('require\\([\\\'\\\"]' + aliasItem + '[\\\\/]', 'g')
            var importReg =  new RegExp('from\\s[\\\'\\\"]' + aliasItem + '[\\\\/]', 'g')

            // 进行全局替换
            content = content.replace(requireReg, 'require(\'' + pathCompatible(path.join(__dirname, dest + realPath)))
            content = content.replace(importReg, 'from \'' + pathCompatible(path.join(__dirname, dest + realPath)))
        })
        file._contents = Buffer.from(content)
        this.push(file)
        cb()
    })
    
    function pathCompatible(src){
        /**
         * 因为path.join()返回的路劲片段分隔符为 '\\'
         * 但是在输出之后，就被转义了一次，变成了 '\'
         * 这种情况下，出现'\b \s' 一类的路径会无法解析
         * 所以在这里统一转成 '/'
         */
        return src.replace(/\\/g, '/')
    }
}