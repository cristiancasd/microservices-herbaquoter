export const adapteQuoter = (data, products) => {
    const quoterBackend= {...data}
    let totalQuoterTemp=0;
    let pvQuoterTemporal=0;
        const newProductsArrayQuoter=quoterBackend.products.map(productQuoter=>{
            const productToUse= products.find(product=>product.sku==productQuoter.sku)
            if(productToUse){
                totalQuoterTemp+= productQuoter.quantity*productToUse.pricepublic;
                pvQuoterTemporal+= productQuoter.quantity*productToUse.pv;
                return {
                    title: productToUse.title,
                    sku: productQuoter.sku,
                    quantity: productQuoter.quantity,
                    pv: productQuoter.quantity*productToUse.pv,
                    unitPrice: productToUse.pricepublic,
                    total: productQuoter.quantity*productToUse.pricepublic
                }
            }
        })
        return {
            id: quoterBackend.id,
            title: quoterBackend.title,
            description: quoterBackend.description,
            total: totalQuoterTemp,
            pv: pvQuoterTemporal,
            products: newProductsArrayQuoter,
            image: quoterBackend.image,
        }
}




export const adapteQuotersArray = (data, products) => {
    return data.map(quoterBackend=>{
        let totalQuoterTemp=0;  
        let pvQuoterTemporal=0;
        //console.log(' data.map(quoterBackend ', quoterBackend)
        const newProductsArrayQuoter=quoterBackend.products.map(productQuoter=>{
           // console.log('newProductsArrayQuoter=quoterBackend.products.map(productQuoter, ',productQuoter)
            const productToUse= products.find(product=>product.sku==productQuoter.sku)
            if(productToUse){
                totalQuoterTemp+= productQuoter.quantity*productToUse.pricepublic;
                pvQuoterTemporal+= productQuoter.quantity*productToUse.pv;
                return {
                    title: productToUse.title,
                    sku: productQuoter.sku,
                    quantity: productQuoter.quantity,
                    pv: productQuoter.quantity*productToUse.pv,
                    unitPrice: productToUse.pricepublic,
                    total: productQuoter.quantity*productToUse.pricepublic
                }
            }
        })
        return {
            id: quoterBackend.id,
            title: quoterBackend.title,
            description: quoterBackend.description,
            total: totalQuoterTemp,
            pv: pvQuoterTemporal,
            image: quoterBackend.image,
            products: newProductsArrayQuoter,
            
        }
    })
}