
export const adaptNewActiveQuoter= ({activeQuoter, products, skuToDelete=undefined, priceDiscountQuoter='pricepublic'}) =>{
        let productsTemporal=[]
        let totalValue=0
        let totalPV=0

        activeQuoter.products.map((productByQuoter)=>{
            if(productByQuoter){
                const product=products.find(product=>product.sku==productByQuoter.sku)
            if(skuToDelete!=productByQuoter.sku){
                productsTemporal.push(
                    {
                        ...productByQuoter,
                        quantity: productByQuoter.quantity,
                        title: product.title,
                        unitPrice: product[priceDiscountQuoter], 
                        total: productByQuoter.quantity*product[priceDiscountQuoter]
                    }
                )
                totalValue+=productByQuoter.quantity*product[priceDiscountQuoter];
                totalPV+=productByQuoter.quantity*product.pv;
            }
            }
            
        })

        /*Object.entries(activeQuoter.products).forEach(([key, value]) => {
            const product=products.find(product=>product.sku==key)
            if(skuToDelete!=key){ 
                productsTemporal[key]={
                    quantity: value.quantity,
                    title: product.title,
                    unitPrice: product[priceDiscountQuoter], 
                    total: value.quantity*product[priceDiscountQuoter]
                }
                totalValue+=value.quantity*product[priceDiscountQuoter];
                totalPV+=value.quantity*product.pv;
            }
        }); */

        
        const newQuoterActive={ 
            ...activeQuoter,
            products: productsTemporal,
            total: totalValue,
            pv: +totalPV.toFixed(2),
        }
        console.log(' ------ products ', products)
        console.log(' ------ newQuoterActive ', newQuoterActive)
        return newQuoterActive
}


