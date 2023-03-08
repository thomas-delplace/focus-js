/**
 * 
 * IN DEVELOPMENT
 * 
 * 
 */
class FOCUS_HISTOGRAM{
    constructor(numberOfBands, bitDepth = 8){
        this.maxvalue = Math.pow(2,bitDepth)
        this.numberOfBands = numberOfBands
        this.bandWidth = this.maxvalue/numberOfBands
        this.red = new Uint8Array(this.numberOfBands)
        this.green = new Uint8Array(this.numberOfBands)
        this.blue = new Uint8Array(this.numberOfBands)
        this.white = new Uint8Array(this.numberOfBands)
    }
    pixels = [
        [255,54,2231],
        [2,2031,200],
        [200,3154,81],
        [4255,54,65535],
        [4002,31,200],
        [200,154,1081]
    ]
    getBand(number){
        return Math.floor(number/this.bandWidth)
    }
    get getHisto(){
        console.log(this.bandWidth)
        this.pixels.forEach(pixel=>{
            let rgbBands = []
            pixel.forEach(chan=>{
                let band = this.getBand(chan)
                if(band === this.numberOfBands){
                    band -= 1
                }
                this.red[band]+=1
                rgbBands.push(band)
            })
            this.red[rgbBands[0]]+=1
            this.green[rgbBands[1]]+=1
            this.blue[rgbBands[2]]+=1
        })
        return this
    }
}

const a = new FOCUS_HISTOGRAM(256,16)
a.getHisto
console.log(a.red)

// DEAD_ZONE