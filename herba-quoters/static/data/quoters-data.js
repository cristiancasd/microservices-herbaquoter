
 const uuid = require('uuid');
 
 const initialQuoters=[
    {
        //id: 'loseweight-minimum',
        id: uuid.v4(),
        title: "Lose-Minimum",
        description: "",
        products:[
            {
                sku:"0146", //batido
                quantity:2,
            },
            {
                sku:"2870", //te 51gr
                quantity:1,
            },
        ],
        image:"loseweight-minimum.jpg"
    },

    {
        //id: 'loseweight-medium',
        id: uuid.v4(),
        title: "Lose-Medium",
        description: "",
        products:[
            {
                sku:"0146", //batido
                quantity:2,
            },
            {
                sku:"2870", //te 51gr
                quantity:1,
            },
            {
                sku:"0006", //te aloe
                quantity:1,
            }
        ],
        image:"loseweight-medium.jpg"
    },
    {
        //id: 'loseweight-full',
        id: uuid.v4(),
        title: "Lose-Full",
        description: "",
        products:[
            {
                sku:"0146", //batido
                quantity:2,
            },
            {
                sku:"2870", //te 51gr
                quantity:1,
            },
            {
                sku:"0006", //te aloe
                quantity:1,
            },
            {
                sku:"2864", //te Prote PPP
                quantity:1,
            },
            {
                sku:"2863", //te Fibra
                quantity:1,
            },

        ],
        image:"loseweight-full.jpg"
    },

]

const initialData=()=>{
    return initialQuoters
}

module.exports={initialData}