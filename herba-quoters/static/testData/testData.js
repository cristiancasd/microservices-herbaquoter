 const quoterCorrect2= {
    title: 'AMIGAAAA',
    description: 'AMIGAAAA',
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        }
    ]
}

 const quoterCorrect= {
    title: 'Amigaaaaa2',
    description: 'Amigaaaaa2',
    image:'',
    products:[
        {
            "sku":"0789",
            "quantity":8
        },
        {
            "sku":"6585",
            "quantity":3
        }
    ]
}

 const quoterCorrect3= {
    title: 'quoter3',
    description: 'quoter3',
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        },
        {
            "sku":"0290",
            "quantity":3
        }
    ]
}

 const quoterCorrect4= {
    title: "quoter4",
    description: "quoter4",
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        },
        {
            "sku":"0290",
            "quantity":3
        }
    ]
}

 const quoterCorrect5= {
    title: "quoter5",
    description: "quoter5",
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        }
    ]
}

 const quoterBadWithoutTitle= {
    //title: 'pruebaBad',
    image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        }
    ]
}

 const quoterBadWithoutImage= {
    title: 'pruebaBad',
    //image:'',
    products:[
        {
            "sku":"0146",
            "quantity":8
        }
    ]
}

 const quoterWithProductArrayBad={
    title: 'pruebaBad',
    image: '',
    products:[
        {
            "skupd":"0146",
            "quantity":8
        }
    ]
}


const testData=()=>{
    return {quoterCorrect, quoterCorrect2, quoterCorrect3, quoterCorrect4, quoterCorrect5,quoterBadWithoutTitle,quoterBadWithoutImage,quoterWithProductArrayBad }
}

module.exports={testData}
