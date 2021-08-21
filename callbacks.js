//what are callbacks and how the callbacks create a callback hell 
//first i am gonna represent it using an example

//say you download a file and then you want to compress it and then upload it
//so these procedures need to be one after another 

//as javascript being an asyncronous single threaded language does not wait for one preocess to end and thus moves on coz....time and js waits for none

//implementing it using setTimeout


// function download(url){
    
//     let fileName = url.split('/').pop();
//     console.log('Downloading file: '+fileName);
//     setTimeout(function(){
//         console.log('File downloaded: '+fileName);
//     },2000);
// }

// function compress(file,format){
//     let compressedFileName = file.split('.')+'.' + format;
//     console.log('Compressing File: ' + compressedFileName)
//     setTimeout(function(){
//         console.log('File compressed: ' + compressedFileName)
//     },3000);
// }

// function upload(source,file){
//     let dest = source + '/' + file;
//     console.log('File uploading to: '+ dest);
//     setTimeout(function(){
//         console.log('File uploaded at: '+ dest);
//     },4000); 
// }

// download('https://kissanime.co/naruto/kuruma.jpg');
// compress('kuruma.jpg','zip');
// upload('https://kissanime.co/naruto/jinchuriki','ino.zip');

//so this way does not follows the mechanism that needs to be followed so as to make javascript work as synchronous
//callbacks could be used 
//will demonstrate it with an example;
//lets just start by copying and commenting the above code
 

// function download(url,downloaded){
//     if(!url.startsWith('http')){
//         return downloaded(new Error('unable to parse a url of a format diff than http'))
//     }
//     let fileName = url.split('/').pop();
//     console.log('Downloading file: '+fileName);
//     setTimeout(function(){
//         console.log('File downloaded: '+fileName);
//         downloaded(null,fileName);
//     },2000);
// }

// function compress(files,format,compressed){
//     if(['zip','7z','gzip'].indexOf(format)== -1){
//         return compressed(new Error('invalid compression format'))
//     }
    
//     let compressedFileName = files.split('.')[0]+  '.' + format;

//     console.log('Compressing File: ' + compressedFileName)
//     setTimeout(function(){
//         console.log('File compressed: ' + compressedFileName)
//         compressed(null,compressedFileName);
//     },3000);
// }

// function upload(source,file,uploaded){
//     if(!source.startsWith('ftp')){
//         return uploaded(new Error('cant upload over any other server rather than the ones that uses ftp'));
        
//     }
//     let dest = source + '/' + file;
//     console.log('File uploading to: '+ dest);
//     setTimeout(function(){
//         console.log('File uploaded at: '+ dest);
//         uploaded(null,dest);
//     },4000); 
// }


// download('https://kissanime.co/naruto/kuruma.jpg',(err,fileName)=>{
//     if(err){
//         throw err;
//     }
//     compress(fileName,'zip',(err,compressedFileName)=>{
//         if(err)throw err;
//         upload('ftp://kissanime.co/naruto/jinchuriki',compressedFileName,(err)=>{
//             if(err)throw err;
//         });
//     })
// })


//this way the process will run the way we want but it will result in a callback hell 
//suppose we have to create a whole functionality that is dependant upon a callback and a whole another functionality that 
//is at the topologically lowest endpoint that way there would be a hell lot of callbacks

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
  