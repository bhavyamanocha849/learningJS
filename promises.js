/*lets look at some alternatives to prevent callback hell
    promisies
    So the first way to is by implementing promises
    rather not implementing but make the function return a promise
    */

    //in the above code i will be adding error handling

    //the only difference here is that we will be wrapping the whole function into a promise

    function download(url){
        return new Promise((resolve,reject)=>{
            if(!url.startsWith('http')){
                return reject(new Error('unable to parse a url of a format diff than http'))
            }
            let fileName = url.split('/').pop();
            console.log('Downloading file: '+fileName);
            setTimeout(function(){
                console.log('File downloaded: '+fileName);
                resolve(fileName);
            },2000);
        })
    }
    
    function compress(files,format){
        return new Promise((resolve,reject)=>{
            if(['zip','7z','gzip'].indexOf(format)== -1){
                return reject(new Error('invalid compression format'))
            }
            
            let compressedFileName = files.split('.')[0]+  '.' + format;
        
            console.log('Compressing File: ' + compressedFileName)
            setTimeout(function(){
                console.log('File compressed: ' + compressedFileName)
                resolve(compressedFileName);
            },3000);
        })
    }
    
    function upload(source,file){
        return new Promise((resolve,reject)=>{
            if(!source.startsWith('ftp')){
                return reject(new Error('cant upload over any other server rather than the ones that uses ftp'));
                
            }
            let dest = source + '/' + file;
            console.log('File uploading to: '+ dest);
            setTimeout(function(){
                console.log('File uploaded at: '+ dest);
                resolve(dest);
            },4000); 
        })
    }
    console.log('start')
    download('https://kissanime.co/naruto/kuruma.jpg')
    .then((fileName)=>{compress(fileName,'zip')
        .then((compressedFileName)=>{upload('ftp://kissanime.co/naruto/jinchuriki',compressedFileName);})
    });
    console.log('end')
  