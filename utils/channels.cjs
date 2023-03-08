class FOCUS_CHANNEL {
    /**
     * @param {Number} average
     * @param {Number} min
     * @param {Number} max
     * @param {array} burn // don't store the data in Uint16Array[x-location, y-location], pleeeease !  /// to fix 
     * @param {array} crush // don't store the data in Uint16Array[x-location, y-location], pleeeease !  /// to fix 
     * @param {Number} burnRatio
     * @param {Number} crushRatio
     * @param {Number} dynamicRange
     * @bite
     */
    constructor(average = undefined, min = undefined, max = undefined, burn = undefined, crush = undefined, burnRatio = undefined, crushRatio = undefined, dynamicRange = undefined) {
        this.average = average,
        this.min = min,
        this.max = max,
        this.burn = burn,
        this.crush = crush,
        this.burnRatio = burnRatio,
        this.crushRatio = crushRatio,
        this.dynamicRange = dynamicRange
    }
}
const fcsChan = (average = undefined, min = undefined, max = undefined, burn = undefined, crush = undefined, burnRatio = undefined, crushRatio = undefined, dynamicRange = undefined)=>{
    return new FOCUS_CHANNEL(average, min, max, burn, crush, burnRatio, crushRatio, dynamicRange)
}
module.exports = fcsChan