
class Logger{

    static get x(){ return 'static x' };

    /**
     * @description Logs msg to the console
     * @example
     * // returns 2
     * globalNS.method1(5, 10);
     * @param {string} msg 
     */
    log(msg){
        console.log(msg);
    }
}

module.exports = Logger;