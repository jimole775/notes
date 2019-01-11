/**
 * Created by Andy-Rong on 2017/7/14.
 */
var mongo = require("mongodb");
var server = new mongo.Server("localhost",27017,{auto_reconnect:true});
var db = new mongo.Db("foo",server,{safe:true});
