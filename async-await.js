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
        },1500);
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
        },1000);
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
        },500); 
    })
}

//<------------------Async-Await Hell------------------------------>// 
//when multiple files are to be downloaded, compressed and uploaded
//async await hell
//could be executed simultaneouly

async function tasks(){ 

    const start = new Date().getTime();
    const file1 = await download('http://site.com/saa/image1.jpg');
    const file2 = await download('http://site.com/saa/image2.jpg');
    const file3 = await download('http://site.com/saa/image3.jpg');

    const archive1 = await compress(file1,'gzip');
    const archive2 = await compress(file2,'7z');
    const archive3 = await compress(file3,'zip');

    await upload('ftp://site.com/saa',archive1);
    await upload('ftp://site.com/saa',archive2);
    await upload('ftp://site.com/saa',archive3);

    console.log((new Date().getTime() - start)/1000);
}
tasks();


//<---------------Preventing Async-Await Hell-I-------------------------->// 
async function task1(){
    const file1 = await download('http://site.com/saa/image1.jpg');
    const archive1 = await compress(file1,'gzip');
    await upload('ftp://site.com/saa',archive1);
}

async function task2(){
    const file2 = await download('http://site.com/saa/image2.jpg');
    const archive2 = await compress(file2,'7z');
    await upload('ftp://site.com/saa',archive2);
}

async function task3(){
    const file3 = await download('http://site.com/saa/image3.jpg');
    const archive3 = await compress(file3,'zip');
    await upload('ftp://site.com/saa',archive3);
}

//one way to prevent async await hell from happening
async function tasks(){
    const start = new Date().getTime();

    const completed1 =  task1();
    const completed2 =  task2();
    const completed3 =  task3();

    await completed1;
    await completed2;
    await completed3;  
    console.log((new Date().getTime() - start)/1000);
}

tasks();

//<---------------Preventing Async-Await Hell -I------------------------------>// 
//another is Promise.All();
//it returns a new promise so .then you could further do the tasks which need to be in sync
const start = new Date().getTime();
Promise.all([
    task1(),
    task2(),
    task3()
]).then(()=>{
    console.log((new Date().getTime() - start)/1000);
    console.log("all tasks are done parallely")
})