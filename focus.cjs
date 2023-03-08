const FOCUS_CHANNEL = require("./utils/channels.cjs")
const FOCUS_ERRORS = require("./utils/errors.cjs")
const FOCUS_PICTURE = require("./utils/picture.cjs")
const {cst, tags} = require("./utils/constants.cjs")

class FOCUS_LIB{
    createPicture(file, bytesPerSample = 8){
        return new FOCUS_PICTURE(file, bytesPerSample)
    }
    /**
     * @param {Number} average
     * @param {Number} min
     * @param {Number} max
     * @param {array} burn
     * @param {array} crush
     * @param {Number} burnRatio
     * @param {Number} crushRatio
     * @param {Number} dynamicRange
     */
    setChannel(average = undefined, min = undefined, max = undefined, burn = undefined, crush = undefined, burnRatio = undefined, crushRatio = undefined, dynamicRange = undefined){
        return new FOCUS_CHANNEL(average, min, max, burn, crush, burnRatio, crushRatio, dynamicRange)
    }
    error(msg) { FOCUS_ERRORS(msg) }
}
const Focus = new FOCUS_LIB

module.exports = Focus