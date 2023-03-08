# FOCUS JS

## REQUIREMENTS
>
>### NodeJs
>https://nodejs.org/
>>#### Packages
>> Path - https://www.npmjs.com/package/path
>>```
>>npm install path
>>```
>>
>> ExifTool Vendored - https://github.com/photostructure/exiftool-vendored.js
>>```
>>npm install exiftool-vendored
>>```
>>
>> Node FileSystem
>>```
>>npm install fs
>>```
>>
>> Node ChildProcess
>>```
>>npm install child_process
>>```
>>
>>
>### Python
>https://www.python.org/
>>#### Libraries
>>OpenCV for Python - https://pypi.org/project/opencv-python/
>>```
>>pip install opencv-python
>>```
>
>
> 

## <span class="colour" style="color:rgb(0, 175, 75)">FOCUS_PICTURE</span><span class="colour" style="color:rgb(100, 150, 200)"> _(Class)_ </span>
This defines the FOCUS_PICTURE class that the application uses to store infos about the picture and process it.
### <ins>CONSTRUCTOR</ins>

>#### file
>
>`String`
>
>Absolute path to the file
>
>Sets the *[this.fullPath](#fullpath)* value
>
>___
>
>#### bytesPerSample *(optional)*
>
>`Number | 8 (default)`
>
>Bit depth of the picture. By default, jpeg images have a bit depth of 8bits per channel.
>
>However, the raw pictures have a bigger bit depth up to 16
>
>Sets the *[this.bytesPerSample](#bytespersample-1)* value

___

### <ins>PROPERTIES</ins>
>#### PUBLIC
>>##### fullPath
>>
>>`String`
>>
>>Absolute path to the file
>>
>>```js
>> this.fullPath = "C:/Users/rickastely/path/to/the/picture/mypicture.jpg"
>>```
>>
>>___
>>
>>##### name
>>
>>`String`
>>
>>File name without any extension
>>
>>```js
>> this.name = "mypicture"
>>```
>>
>>___
>>
>>##### bytesPerSample
>>
>>`Number` **`DEFAULT = 8`**
>>
>>The number of bytes that every channel of a pixel uses
>>
>>*If other than `8`, it has to be set manually (see the [constructor](#constructor)) because of the unreliability of the exif for this information*
>>
>>```js
>> this.bytesPerSample = 14
>>```
>>
>>___
>>
>>##### extension
>>
>>`String`
>>
>>The extension of the file without the point
>>
>>```js
>> this.extension = 'jpg' 
>>```
>>___
>>
>>##### fileSize
>>
>>`Object`
>>
>>>Contains the file size in different units : octets, kilobytes and megabytes
>>>
>>>###### .octets
>>>
>>>`Number`
>>>
>>>```js
>>> this.fileSize.octets = 2164516
>>>```
>>>
>>>___
>>>
>>>###### .kilo
>>>
>>>`Number`
>>>
>>> Rounded to the second decimal
>>>
>>>```js
>>> this.fileSize.kilo = 2164.52
>>>```
>>>
>>>___
>>>
>>>###### .mega
>>>
>>>`Number`
>>>
>>> Rounded to the second decimal
>>>
>>>```js
>>> this.fileSize.mega = 2.16
>>>```
>
>___
>
>#### PRIVATE
>
>>##### blur
>>
>>`Number | undefined (default)`
>>
>>Represents the bluriness of the picture.
>>
>>Is set using the [`analyze()`](#analyze()) method
>>
>>```js
>> this.blur = 71.25416542364
>>```
>>
>>___
>>
>>##### contrast
>>
>>`Number | undefined (default)`
>>
>> Float between 0 and 1
>>
>>Represents the bluriness of the picture.
>>
>>Is set using the [`analyze()`](#analyze()) method
>> 
>>
>>```js
>> this.contrast = 0.273
>>```
>>
>>___
>>
>>##### red
>>
>>`FOCUS_CHANNEL Object | undefined (default)`
>>
>>See the [FOCUS_CHANNEL class definition](#constructor-1) for more informations
>>___
>>
>>##### green
>>
>>`FOCUS_CHANNEL Object | undefined (default)`
>>
>>See the [FOCUS_CHANNEL class definition](#constructor-1) class for more informations
>>
>>___
>>
>>##### blue
>>
>>`FOCUS_CHANNEL Object | undefined (default)`
>>
>>See the [FOCUS_CHANNEL class definition](#constructor-1) class for more informations
>>
>>___
>>
>>##### expo
>>
>>`FOCUS_CHANNEL Object | undefined (default)`
>>
>>See the [FOCUS_CHANNEL class definition](#constructor-1) class for more informations
>>
>>___
>>
>>##### exif
>>
>>`Object | undefined (default)`
>>
>>Set by the getExif method
>>
___

### <ins>METHODS</ins>
>#### GETTERS
>>##### blur
>>
>>Returns the value of the **#blur** property.
>>
>>```js
>>  console.log(myPicture.blur)
>>```
>>
>>```console
>>  undefined | number
>>```
>>
>>##### contrast
>>
>>Returns the value of the **#contrast** property.
>>
>>```js
>>  console.log(myPicture.contrast)
>>```
>>
>>```console
>>  undefined | number
>>```
>>##### red
>>
>>Returns the value of the **#red** property.
>>
>>```js
>>  console.log(myPicture.red)
>>```
>>
>>```console
>>  undefined | Object
>>```
>>##### green
>>
>>Returns the value of the **#green** property.
>>
>>```js
>>  console.log(myPicture.green)
>>```
>>
>>```console
>>  undefined | Object
>>```
>>##### blue
>>
>>Returns the value of the **#blue** property.
>>
>>```js
>>  console.log(myPicture.blue)
>>```
>>
>>```console
>>  undefined | Object
>>```
>>##### expo
>>
>>Returns the value of the **#expo** property.
>>
>>```js
>>  console.log(myPicture.expo)
>>```
>>
>>```console
>>  undefined | Object
>>```
>#### PUBIC
>>##### getExif
>>`async` `no arguments`
>>
>> Returns the value of the exif property
>>
>> If the exif property hasn't already been set, it uses the [exiftool-vendored](https://www.npmjs.com/package/exiftool-vendored) library to set it prior to return it
>>
>>```js
>>   const myPicture = fcs.picture('path/to/my/picture.jpg')
>>   const myExif = myPicture.getExif()
>>   console.log("Type : ",typeOf(myExif))
>>   console.log(myExif.MIMEType)
>>```
>>
>>```console
>>   Type : object
>>   {
>>       SourceFile: 'path/to/my/picture.jpg',
>>       errors: [],
>>       tz: 'UTC+1',
>>       tzSource: 'offsetMinutesToZoneName from TimeZone',
>>       BulbDuration: 0,
>>       ExifToolVersion: 12.56,
>>       FileName: 'picture.jpg',
>>       Directory: 'path/to/my',
>>       FileSize: '74 kB',
>>       FileModifyDate: ExifDateTime {
>>           year: 2023,
>>           month: 2,
>>           day: 26,
>>           hour: 16,
>>           minute: 17,
>>           second: 47,
>>           millisecond: undefined,
>>           tzoffsetMinutes: 60,
>>           rawValue: '2023:02:26 16:17:47+01:00',
>>           zoneName: 'UTC+1'
>>       },
>>       
>>       ...
>>       
>>   }
>>```
>>
>>##### analyze
>>`async` `no arguments`
>>
>> Returns the value of the exif property
>>
>> If the exif property hasn't already been set, it uses the [exiftool-vendored](https://www.npmjs.com/package/exiftool-vendored) library to set it prior to return it
>>
>>```js
>>   const myPicture = fcs.picture('path/to/my/picture.jpg')
>>   const myExif = myPicture.getExif()
>>   console.log("Type : ",typeOf(myExif))
>>   console.log(myExif.MIMEType)
>>```
>>
>>```console
>>   Type : object
>>   {
>>       SourceFile: 'path/to/my/picture.jpg',
>>       errors: [],
>>       tz: 'UTC+1',
>>       tzSource: 'offsetMinutesToZoneName from TimeZone',
>>       BulbDuration: 0,
>>       ExifToolVersion: 12.56,
>>       FileName: 'picture.jpg',
>>       Directory: 'path/to/my',
>>       FileSize: '74 kB',
>>       FileModifyDate: ExifDateTime {
>>           year: 2023,
>>           month: 2,
>>           day: 26,
>>           hour: 16,
>>           minute: 17,
>>           second: 47,
>>           millisecond: undefined,
>>           tzoffsetMinutes: 60,
>>           rawValue: '2023:02:26 16:17:47+01:00',
>>           zoneName: 'UTC+1'
>>       },
>>       
>>       ...
>>       
>>   }
>>```
>>
>>##### rawAnalyze

## <span class="colour" style="color:rgb(0, 175, 75)">FOCUS_CHANNEL</span><span class="colour" style="color:rgb(100, 150, 200)"> _(Class)_ </span> 

### <ins>CONSTRUCTOR</ins>
>#### average
>
>`Number | undefined (default)`
>
>Returns a `float` between 0 and the [max possible value](#max-possible-value) of a channel representing the average exposure.
>
>```js
>// Let's say we have a picture with half of its pixels perfectly white
>// and the other half is only black pixels.
>// The average exposure for this picture will be precisely half of the bit depth
>   this.average = 127 // jpg
>   this.average = 127 // jpg
>
>// as a matter of fact, this is a fully black picture
>   this.average = 0
>
>// this value can only be found in a raw picture, per se
>   this.average = 3240.67842222
>```
>
>___
>
>#### min
>
>`Number | undefined (default)`
>
>Returns an `integer` between 0 and the [max possible value](#max-possible-value) of a channel representing the minimum exposure.
>
>See the [average property](#average) for more informations about max possible values.
>
>```js
>// this is a sane value as well in a jpg picture as in a raw one
>   this.min = 5
>
>// this channel is crushed somewhere, meaning that we lose in dynamic range
>   this.min = 0
>
>// this is either a really overexposed jpg or a normal value for a raw picture
>   this.min = 230
>```
>
>___
>
>#### max
>
>`Number | undefined (default)`
>
>Returns an `integer` between 0 and the [max possible value](#max-possible-value) of a channel representing the maximum exposure.
>
>See the [average property](#average) for more informations about max possible values.
>
>```js
>// this is an insanely underexposed photo, may it be a jpg or a raw
>   this.max : 5
>
>// if it's jpg this channel is burnt somewhere, meaning that we lose in dynamic range
>   this.max : 255
>
>// in a 14bits raw picture, this is a really fine value
>   this.max : 15932
>```
>
>___
>
>>#### burn
>>
>><span style="color:#661133;background-color:#dd88aa;border-radius:20px;">&nbsp;&nbsp; ***IN PROGRESS*** &nbsp;&nbsp;</span>
>>
>>`to determine | undefined (default)`
>>
>>Have to find a way to store a pixel map of the burnt pixels for the channel
>>
>>**The solution has to be efficient and not to greedy for the computer memory**
>>
>>___
>>**Below was a first attempt:**
>> - Problem : the more burnt pixels, the bigger is the amount of data to store and process
>>```js
>>   let pixel = Uint16Array[x-location, y-location]
>>```
>>
>>```js
>>this.burn = [
>>   Uint16Array[0, 123], // 1
>>   Uint16Array[0, 124], // 2
>>   Uint16Array[0, 125], // 3
>>   Uint16Array[0, 126], // 4
>>   Uint16Array[0, 127], // 5
>>   Uint16Array[0, 125]  // 6
>>]
>>// this channel has 6 burnt pixels
>>
>>this.burn.length // the number of burnt pixels for a given channel
>>
>>this.burn[0] // returns the adress of the first burnt pixel (from top left) for this channel
>>this.burn[0][0] // returns the x-location of the first burnt pixel
>>this.burn[0][1] // returns the y-location of the first burnt pixel
>>```
>> If ever someone uploaded a fully white picture of 24MP, this approach would take about 100MB of memory to store only this information, which is not a suitable solution at all.
>
>___
>
>#### crush
>
>`to determine | undefined (default)`
>
>Same issue as [burn](#burn).
>
>___
>
>#### burnRatio
>
>`Number | undefined (default)`
>
>Returns a `unsigned float` smaller than 1 representing the percentage of burnt pixels in this channel
>
>```js
>if(this.burnRatio >= 0.25){
>   // more than 25% of the pixels are burnt in this channel
>}else if(this.burnRatio <0.25 && this.burnRatio >=0.005){
>   // this channel has between 0.5% and 25% of pixels burnt
>}else{
>   // this seem to be a good picture, at least regarding this channel :)
>}
>```
>
>___
>
>#### crushRatio
>
>`Number | undefined (default)`
>
>Returns a `unsigned float` smaller than 1 representing the percentage of crushed pixels in this channel
>
>```js
>if(this.crushRatio >= 0.25){
>   // more than 25% of the pixels are burnt in this channel
>}else if(this.crushRatio <0.25 && this.crushRatio >=0.005){
>   // this channel has between 0.5% and 25% of pixels burnt
>}else{
>   // this seem to be a good picture, at least regarding this channel :)
>}
>```
>
>
>___
>
>#### dynamicRange
>
>`Number | undefined (default)`
>
><span style="color:#dd88aa">*- NOT IMPLEMENTED YET -*</span>
>
>___
>

### APPENDIX
>
>#### Max possible value
>
>```js
>// Max possible value
>(2^this.bytesPerSample)-1
>
>(2^8)-1 : 255      // 8bits picture (ex: jpeg)
>(2^14)-1 : 16383   // 14bits raw picture
>(2^16)-1 : 65535   // 16bits raw picture
>```
>
