const fs = require('fs')

const srcFolder = "build";
const dstFolder = "dist";
const templateFolder = "buildScripts/template";
if(fs.existsSync(dstFolder)){
    fs.rmdirSync(dstFolder,{recursive:true,force:true});
}

fs.mkdirSync(dstFolder);
var ncp = require('ncp').ncp;
  
// Represents the number of pending
// file system requests at a time.
ncp.limit = 16;
  
// ncp(source, destination, callback) 
ncp(srcFolder, dstFolder, 
        function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('Folders copied recursively');
    fs.copyFile(srcFolder + '/index.html', dstFolder+'/viewer.html', (err) => {
        if (err) throw err;
        console.log(`${srcFolder} /index.html was copied to ${dstFolder} /viewer.html`);
      });
    fs.unlinkSync(dstFolder+'/index.html');
    fs.copyFile(templateFolder + '/index.html', dstFolder+'/index.html', (err) => {
    if (err) throw err;
    console.log(`${templateFolder} /index.html was copied to ${dstFolder} /index.html`);
    });
});

