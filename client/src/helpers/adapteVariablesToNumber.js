export const adapteVariablesToNumber = (data) => {
    let adaptedData={}
    let claves = Object.keys(data); 
    for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        (clave==='sku' || !(+data[clave]))
            ? adaptedData[clave]= data[clave]
            : adaptedData[clave]= +data[clave]
    }
    return adaptedData
} 