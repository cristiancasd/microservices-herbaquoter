export const isTargetFilesCorrect=(files)=>{
    if(files===0)  return false; 
    const validExtensions=['png','jpg','jpeg'];
    const dividedName = files[0].name.split('.'); 
    const extension = dividedName[dividedName.length-1]
    if(!validExtensions.includes(extension)) return false;
    return true
}