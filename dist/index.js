"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util = require('util');
var dayjs = require('dayjs');
//import Redis78 from "./Redis78";
class UpInfo {
    //redis: Redis78
    constructor(ctx) {
        //数据获取非必填字段
        this.getstart = 0; //分页起始
        this.getnumber = 15; //单页数量
        this.order = "idpk"; //排序
        this.bcid = ""; //saas访问服务方数据
        this.mid = ""; //修改 行id
        this.pars = []; //上传参数
        this.cols = []; //上传 相关 列数组
        this.jsonbase64 = true; //JSON化后再BASE64
        this.jsonp = false; //是否跨域访问
        this.upid = ""; //请求号
        this.midpk = 0; //修改时的行号
        //调试 监控用
        this.debug = false; //跟踪某用户
        this.pcid = ""; //机器码
        this.pcname = ""; //电脑名
        this.source = ""; //软件来源
        this.v = 17; //api版本号 （升级不再新建目录)
        this.cache = ""; //防重放攻击
        //自动获取或服务器生成
        this.ip = "";
        this.method = ""; //调用方法
        this.apisys = ""; //调用API目录（用于日志）
        this.apiobj = ""; //调用API对象（用于日志）
        this.uptime = new Date();
        this.utime = dayjs().format('YYYY-MM-DD HH:mm:ss'); //简化文本的日期
        this.errmessage = "";
        //上传临时存 验证后再用
        this.cidn = ""; //未验证的cid
        this.parsn = ""; //未验证的cid
        this.colsn = ""; //未验证的cols
        //需数据库读取验证
        this.sid = ""; //会话ID
        this.cid = ""; //先存临时验证后转 防忘记
        this.uid = ""; //用户ID
        this.coname = '测试帐套'; //帐套名
        this.uname = ""; //用户名
        this.pwd = ""; //不限制多地登录的场合
        this.weixin = ""; //需要权限的要绑定微信
        this.idceo = ""; //管理员UID 有些只能帐套管理员操作的
        this.truename = ""; //真实姓名   
        this.mobile = ""; //手机号码 
        this.idpk = 0; //用户编号idpk
        //返回用
        this.res = 0; //错误码
        this.errmsg = ""; //出错信息
        this.backtype = "json"; //返回类型 默认json 可为string
        if (ctx == null)
            return;
        this.upid = this.getNewid(); //请求号
        this.ctx = ctx;
        let req = ctx.request;
        this.apisys = ctx.params.msys;
        this.apiobj = ctx.params.apiobj;
        let pars = null;
        if (req.method == "GET") {
            pars = req.query;
        }
        else if (req.method == "POST") {
            pars = req.fields;
            if (pars == undefined)
                pars = req.body;
        }
        else if (req.method == "SOCK") {
            pars = req.fields;
        }
        this.method = req.path;
        if (pars == undefined)
            return;
        this.bcid = pars["bcid"] || "d4856531-e9d3-20f3-4c22-fe3c65fb009c";
        this.v = req.header['v'] || pars["v"] || 22; //api版本号
        this.getstart = +pars["getstart"] || 0;
        this.parsn = pars["pars[]"] || pars["pars"] || "";
        this.source = req.header['source'] || pars["source"] || 'no';
        this.uname = req.header['uname'] || pars["uname"] || 'guest';
        this.pwd = req.header['pwd'] || pars["pwd"] || ''; //不限制多地登录
        this.sid = req.header['sid'] || pars["sid"] || '';
        this.mid = pars["mid"] || this.getNewid();
        this.midpk = pars["midpk"] || -1;
        this.getnumber = +pars["getnumber"] || 15;
        this.pcid = req.header['pcid'] || pars["pcid"] || ''; //机器码
        this.pcname = req.header['pcname'] || pars["pcname"] || ''; //机器码
        this.ip = req.header['x-forwarded-for'] || ctx.req.connection.remoteAddress || ""; //这里NGINX已经处理了
        let i = this.ip.indexOf("ffff");
        if (i >= 0) { //::ffff:
            this.ip = this.ip.substring(i + 5, this.ip.length);
        }
        this.colsn = pars["cols[]"] || pars["cols"] || '["all"]';
        this.order = pars["order"] || 'idpk';
        this.jsonp = pars["jsonp"] || false; //支持跨域
        this.backtype = pars["backtype"] || "json";
        this.cache = req.header['cache'] || pars["cache"] || ''; //随机码 防重放攻击
        if (typeof this.colsn === 'string')
            this.cols = JSON.parse(this.colsn);
        if (this.v >= 17.01) {
            this.jsonbase64 = pars["jsonbase64"] || true; //下版默认为真         
            //pcname uname改base64编码了
            this.uname = new Buffer(this.uname.replace(/\*/g, "+").replace(/-/g, "/").replace(/\./g, "="), 'base64').toString();
            if (this.pcname != "") {
                this.pcname = new Buffer(this.pcname.replace(/\*/g, "+").replace(/-/g, "/").replace(/\./g, "="), 'base64').toString();
            }
        }
        else if (this.v == 17) { //下版删除           
            this.jsonbase64 = pars["jsonbase64"] || false; //下版默认为真 
            this.cidn = pars["cid"] || ""; //下版删除 不用上传直接获取 
        }
        if (this.parsn == "") {
            this.pars = [];
            return;
        }
        if (this.jsonbase64) {
            try {
                this.pars = new Buffer(this.parsn.replace(/\*/g, "+").replace(/-/g, "/").replace(/\./g, "="), 'base64').toString();
                if (this.v >= 22) {
                    if (this.pars != "null")
                        this.pars = this.pars.split(",~");
                    else
                        this.pars = [];
                }
                else {
                    if (this.pars != "null")
                        this.pars = JSON.parse(this.pars);
                    else
                        this.pars = [];
                }
            }
            catch (e) {
                this.log("jsonbase eval err:" + Util.inspect(e));
                this.log(this.method + Util.inspect(this.colsn) + "jsonbase eval err:" + Util.inspect(this.pars));
            }
        }
    }
    /**
     * 如果是文件日志或数据库或日志服务 请重写此方法
     * @param info
     */
    log(info) {
        console.log(info);
    }
    getMaster() {
        let up2 = new UpInfo(null);
        up2.sid = ' a';
        up2.cid = 'd4 09c';
        up2.bcid = 'd4  09c';
        up2.mid = this.getNewid();
        up2.uname = 'admin';
        up2.pars = [];
        up2.getstart = 0;
        up2.ip = "127.0.0.1";
        return up2;
    }
    ;
    getGuest() {
        let up2 = new UpInfo(null);
        up2.sid = 'GUEST888-8888-8888-8888-GUEST88GUEST';
        up2.cid = 'GUEST000-8888-8888-8888-GUEST00GUEST';
        up2.bcid = 'd4856531-e9d3-20f3-4c22-fe3c65fb009c';
        up2.mid = this.getNewid();
        up2.uname = 'guest';
        up2.pars = [];
        up2.getstart = 0;
        up2.ip = "127.0.0.1";
        return up2;
    }
    ;
    getNewid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    inArray(o, cols) {
        for (var i = 0; i < cols.length; i++) {
            if (o === cols[i])
                return true;
        }
        return false;
    }
    /**
     * 检查上传的列是否符合表定义 防注入
     * @param cols
     */
    checkCols(cols) {
        if (this.cols.length === 1 && (this.cols[0] === 'all' || this.cols[0] === 'idpk')) {
            return "checkcolsallok";
        }
        var isback = "checkcolsallok";
        try {
            this.cols.forEach((item) => {
                if (!this.inArray(item, cols))
                    isback = item;
            });
        }
        catch (e) {
            this.log("checkCols err" + Util.inspect(e));
            return isback;
        }
        return isback;
    }
    ;
    /**
     * 检查上传的排序是否符合表定义 防注入
     * @param cols
     */
    inOrder(cols) {
        var isin = true;
        var orders = this.order.split(",");
        for (var i = 0; i < orders.length; i++) {
            var o = orders[i];
            //如果有desc
            var ll = o.indexOf(" desc");
            if (ll >= 0 && ll === o.length - 5)
                o = o.substr(0, ll);
            if (o === 'id' || o === 'idpk' || o === 'uptime' || o === 'upby')
                continue;
            if (o !== 'id' && o !== 'idpk' && !this.inArray(o, cols)) {
                return false;
            }
        }
        return isin;
    }
    ;
}
exports.default = UpInfo;
//# sourceMappingURL=index.js.map