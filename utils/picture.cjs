const Path = require("path")
const Fs = require('fs')
const ExifTool = require("exiftool-vendored").ExifTool
const Spawn = require('child_process').spawn

/* focus module */
const fcs = require('./constants.cjs')
const FocusError = require('./errors.cjs')
const FocusChan = require('./channels.cjs')



                                                     /// in progress 
class FOCUS_PICTURE{
  /**
   * 
   * @param {string} file 
   * @param {int} depth default value is 8 (Jpeg standard 8 bits per sample)
   */
  constructor(file,bytesPerSample=8) {
    this.fullPath = file,
    this.name = Path.parse(file).name,
    this.bytesPerSample = bytesPerSample,
    this.extension = Path.extname(file).substring(1),
    this.fileSize = {
      octets : Fs.statSync(file).size,
      kilo : parseFloat(Math.round(Fs.statSync(file).size/1000).toFixed(2)),
      mega : parseFloat((Math.round(Fs.statSync(file).size/10000)/100).toFixed(2))
    }
  }
  #blur = undefined
  #contrast = undefined
  #red = undefined // FocusChan
  #green = undefined // FocusChan
  #blue = undefined // FocusChan
  #expo = undefined // FocusChan
  #exif = undefined
  get blur(){return this.#blur}
  get contrast(){return this.#contrast}
  /**
   * `GETTER`
   * 
   *  Gets the different attributes of the red channel :
   * 
   * `average`
   * `min`
   * `max`
   * `burn`
   * `crush`
   * `histogram`
   * `burnRatio`
   * `crushRatio`
   */
  get red(){return this.#red}
  /**
   * `getter`
   * 
   *  Gets the different attributes of the green channel :
   * 
   * `average`
   * `min`
   * `max`
   * `burn`
   * `crush`
   * `histogram`
   * `burnRatio`
   * `crushRatio`
   */
  get green(){return this.#green}
  /**
   * `getter`
   * 
   *  Gets the different attributes of the blue channel :
   * 
   * `average`
   * `min`
   * `max`
   * `burn`
   * `crush`
   * `histogram`
   * `burnRatio`
   * `crushRatio`
   */
  get blue() {return this.#blue}
  /**
   * `getter`
   * 
   *  Gets the different attributes of exposure :
   * 
   * `average`
   * `min`
   * `max`
   * `burn`
   * `crush`
   * `histogram`
   * `burnRatio`
   * `crushRatio`
   * `dynamicRange`
   */
  get expo(){return this.#expo}
  /**
   * `async` Method to get the exifs of the FOCUS_PICTURE object
   * 
   * If the exifs are already set, it only returns this.exif
   * 
   * Else, it set this.exif with exiftool-vendored library then returns this.exif
   * @returns `this.exif`
   */
  async getExif(){
    if(this.exif) return this.exif
    
    const exiftool = new ExifTool({ taskTimeoutMillis: 10000 })
    this.exif = await exiftool.read(this.fullPath)
    exiftool.end()
    return this.exif
  }
  /**
   * 
   * Check if the image is corrupted by comparing the extension to the mimetype
   * 
   * @returns
   * 
   * `TRUE` if the file is corrupted
   * 
   * `FALSE` if not
   */
  /*async isCorrupted(){
    let exif = await this.getExif()
    try{
      if(this.extension !== undefined && this.extension !== exif.FileTypeExtension){
        throw `Error [FILE CORRUPTED] : the extension (${this.extension}) doesn't match the file format(${exif.MIMEType}).`
      }
      return false
    }
    catch(e){
      console.log(e)
      return true
    }
  }*/
  /**
   * 
   * Method to analyze the characteristics of an image such as blur, overexposition or others.
   * 
   * Takes one or more FOCUS_CONSTANT as arguments, see the list below :
   * 
   * `_BLUR` for the blur informations
   * 
   * `_EXPO` for the exposition informations
   * 
   * `_RGB` for the RGB channels
   * 
   * `_R` for the red channel
   * 
   * `_G` for the green channel
   * 
   * `_B` for the blue channel
   * 
   * `_CONTRAST` for the constrast informations
   * @param {FOCUS_CONSTANT} args
   */
  async analyze(...flags){
    if(flags.length === 0){
      flags = [fcs._BLUR,fcs._EXPOSURE,fcs._RGB,fcs._CONTRAST]
    }
    let parameters = ""
    flags.forEach(flag=>{
      parameters = parameters.concat(flag.tag)
    })
    /**
     * Now that our set of options is ready,
     * we send a request to the child process : analysis.py
     * 
     * `argument 1` picture full path (ex: "c:/path/to/file.jpg")
     * 
     * `argument 2` analysis parameters (ex: "FERGBC") 
     * 
     */
    let analysis_process = Spawn('python', ['./python/analysis.py', this.fullPath, parameters])
    analysis_process.stdout.on("data", (data) => {
      let response
      /**
       * RECEIVE THE RESPONSE FROM THE CHILD PROCESS
       */

      /**
       * PARSE THE RESPONSE
       */

      /**
       * UPDATE THE FOCUS_PICTURE FLAGS
       */

      /**
       * UPDATE DATABASE PICTURE FLAGS
       */
    })

    return this
  }
  /**
   * 
   * Use this method to analyze the characteristics of an image such as blur, overexposition or others.
   * 
   * Takes one or more FOCUS_CONSTANT as arguments, see the list below :
   * 
   * `_BLUR` for the blur informations
   * 
   * `_EXPO` for the exposition informations
   * 
   * `_RGB` for the RGB channels
   * 
   * `_R` for the red channel
   * 
   * `_G` for the green channel
   * 
   * `_B` for the blue channel
   * 
   * `_CONTRAST` for the constrast informations
   * @param {FOCUS_CONSTANT} args
   */
  rawAnalyze(...flags){
    if(flags.length === 0){
      flags = [Focus._BLUR,Focus._EXPOSURE,Focus._RGB,Focus._CONTRAST]
    }
    let parameters = ""
    flags.forEach(flag=>{
      parameters = parameters.concat(flag.tag)
    })
    /**
     * Now that our set of options is ready
     * 
     * we send a request to the child process : raw_analysis.py
     * 
     * `argument 1` picture full path (ex: "c:/path/to/file.jpg")
     * 
     * `argument 2` analysis parameters (ex: "FERGBC") 
     * 
     */
    let raw_analysis_process = Spawn('python', ['./python/raw_analysis.py', this.fullPath, parameters,this.exif.ExifImageWidth, this.exif.ExifImageHeight])
    raw_analysis_process.stdout.on("data", (data) => {
      let response
      /**
       * RECEIVE THE RESPONSE FROM THE CHILD PROCESS
       */

      /**
       * PARSE THE RESPONSE
       */

      /**
       * UPDATE THE FOCUS_PICTURE FLAGS
       */

      /**
       * UPDATE DATABASE PICTURE FLAGS
       */
    })
    return this
  }
}
module.exports = FOCUS_PICTURE




const imgtest = new FOCUS_PICTURE(Path.join("C:","Users","zoaap","Documents","GitHub","Aperture","test_images","marie.jpg"))
console.log(imgtest.blur)
/*
let run = async ()=>{
  let myExif = await imgtest.getExif()
  console.log(myExif)
  //timeIt("Exif retrieval")
}
run()*/