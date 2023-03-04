import { createSlice } from "@reduxjs/toolkit";

const activeQuoterExample={
    id:'123',
    title: 'Plan bajar peso',
    description: 'Es el plan mínimo para bajar de peso en un mes',
    img:'',
    products:{
        '2869':{
            title: 'Bebida Herbal',
            quantity: 1,
            unitPrice:173000,
            total: 173000,
            pv: 34.95
        },

        '0146':{
            title: 'Batido nutricional',
            quantity: 2,
            unitPrice:132000,
            total: 132000*2,
            pv: 23.95*2
        },
    },
    total:132000*2+173000,
    pv: 23.95*2+34.95,
}

const activeQuoterExample2={
    id:'124',
    title: 'Energía',
    description: 'Energizante y proteína',
    img:'',
    products:{
        '2871':{
            title: 'NRG',
            quantity: 1,
            unitPrice:79000,
            total: 79000,
            pv:14.75
        },
        '2868':{
            title: 'Rebuild Strenght',
            quantity: 1,
            unitPrice:277000,
            total: 277000,
            pv:52.1
        },
    },
    total:277000+79000,
    pv: 52.1+14.75,  
}

export const quoterSlice = createSlice({
    name: 'quoter',

    initialState:{
        //products:[tempProduct,tempProduct2,tempProduct3],
        //categories:[tempCategory, tempCategory2],  
        products:[],
        categories:[],
        orderProducts:{},
        activeProductToEdit: null,

        initialProduct:undefined,
        initialQuoter: undefined,
        activeProduct: undefined,
        activeCategory: undefined,      
        
        
        statusQuoter:'communicating',
        productsLoaded: null,
        categoriesLoaded: null,
        quotersLoaded: undefined,
        quoterProcess: 'View',
        errorMessage: undefined,
        successMessage: undefined,
        mobileOpen: false,
        isScreenCel: false,
        selection:'product',

        priceDiscountQuoter:'pricepublic',


        isAddProductQuoterProcess: false,
        quoters:[],
        activeQuoter:undefined,
        activeQuoterToEdit:undefined,
        quoterSelected:undefined,
        temporalQuoter:{},


        quotersDefaultLoaded: undefined,
        quotersDefault: [],

        navBarSelection:undefined,

        onSaving: false,

    },

    reducers:{

        setOnSaving: (state, {payload})=>{
            state.onSaving=payload;
        },

        setDefaultInitalVariablesRedux: (state)=>{
            state.quotersLoaded=undefined;
        },

        setInitialProduct: (state, {payload}) => {
            console.log('initial product, quoterSlice = ',payload);
            state.initialProduct=payload;
        },

        setInitialQuoter: (state, {payload}) => {
            console.log('initial quoter, quoterSlice = ',payload);
            state.initialQuoter=payload;
            state.activeQuoter=payload;
        },

        setLoadedProductsCategories: (state, {payload}) => {
            productsLoaded= null;
            categoriesLoaded= null;
        },

        setCategories: (state, {payload}) => {
            state.categories=payload;
            state.statusQuoter='ok';
            state.categoriesLoaded='ok';            
        },

        setProducts: (state, {payload}) => {
            state.products= payload;
            state.statusQuoter='ok';
            state.productsLoaded='ok';            
        },

        setQuoters:(state,{payload}) => {
            console.log('estoy en setQuoters ', payload);
            state.quoters=payload;
            state.quotersLoaded=true;
        },

        setQuotersDefault:(state,{payload})=>{
            console.log('estoy en setQuoters Iniital');
            state.quotersDefault=payload;
            state.quotersDefaultLoaded=true;

            state.activeQuoter=payload[0]
            const {title, description}=payload[0];
            state.activeQuoterToEdit={title, description};   
            state.initialQuoter=payload[0];
        },
       

        setOrderProducts: (state, {payload}) =>{
            state.orderProducts=payload
        },

        onDeleteQuoter:( state, { payload }) => {
            console.log('************************* en onDeleteQuoter')
            state.statusQuoter='ok';
            let newQuoterArray=[]
            console.log('entro al map')
            state.quoters.map(
                quoter=>{
                    console.log(quoter)
                    if(quoter.id!==payload)
                        newQuoterArray.push(quoter)
                });
            state.quoters=newQuoterArray;
            state.activeQuoter=undefined;
            //state.initalQuoter=undefined;
        },

        onDeleteProduct:( state, { payload }) => {
            console.log('************************* en onDeleteProduct')
            state.statusQuoter='ok';
            let newProductArray=[]
            console.log('entro al map')
            state.products.map(
                product=>{
                    console.log(product)
                    if(product.id!==payload)
                        newProductArray.push(product)
                });
            state.products=newProductArray;
            state.activeProduct=undefined;
            //state.initalQuoter=undefined;
        },

        onDeleteCategory:( state, { payload }) => {
            state.statusQuoter='ok';
            let newCategoryArray=[]
            state.categories.map(
                category=>{
                    console.log(category)
                    if(category.id!==payload)
                        newCategoryArray.push(category)
                });
            state.categories=newCategoryArray;
            state.activeCategory=undefined;
        },



        onAddNewQuoter: ( state, { payload }) => {
            const {title, description}= payload
            state.statusQuoter='ok';
            state.quotersLoaded=true;
            state.quoters.push( payload );
            state.activeQuoter=payload;
            state.activeQuoterToEdit={title, description}; 
            state.quoterProcess='View'
            
        },

        onUpdateQuoters: ( state, { payload }) => {
            state.statusQuoter='ok';
            state.quoters= state.quoters.map(
                quoter=>{
                    return (quoter.id===payload.id)
                        ? payload
                        : quoter
                })
            state.activeQuoter=payload;
        },

        onAddNewProduct: ( state, { payload }) => {
            state.statusQuoter='ok';
            state.productsLoaded='ok';
            state.categoriesLoaded='ok';
            state.products.push( payload );
        },
        onUpdateProduct: ( state, { payload } ) => {
            state.products = state.products.map( product => {
                if ( product.id === payload.id ) {
                    return payload;
                }
                return product;
            });
            state.statusQuoter='ok';
            state.productsLoaded='ok';
            state.categoriesLoaded='ok';
            //state.selection='product';
        },
        onAddNewCategory: ( state, { payload }) => {
            state.statusQuoter='ok';
            state.productsLoaded='ok';
            state.categoriesLoaded='ok';
            state.categories.push( payload );
            //state.activeCategory = undefined;
            //state.selection='category'
        },
        onUpdateCategory: ( state, { payload } ) => {
            state.categories = state.categories.map( category => {
                if ( category.id === payload.id ) {
                    return payload;
                }
                return category;
            });
            state.statusQuoter='ok';
            state.productsLoaded='ok';
            state.categoriesLoaded='ok';
            //state.selection='category'
            
        },

        setActiveProduct: ( state, { payload } ) => {
            state.quoterProcess= 'View';
            state.statusQuoter='ok';
            state.selection='product';
            state.activeProduct=payload;
            state.activeCategory=undefined; 
            //state.activeQuoter=undefined; 
        },

        setNavBarSelection:( state, { payload } ) => { 
            console.log('estoy en setNavBarSelection= ', payload)
            state.navBarSelection=payload;

            state.isAddProductQuoterProcess= false; 

            state.activeQuoter=
                state.quoters[0]
                    ? state.quoters[0]
                    : state.quotersDefault[0]
                  
        },


        setActiveProductToEdit: ( state, { payload } ) => {
            state.activeProductToEdit=payload;                      
        },

        setActiveCategoryToAdd: ( state, { payload } ) => {
            state.activeCategory=payload;                       
        },

        setActiveCategory: ( state, { payload } ) => {
            state.quoterProcess= 'View';
            state.statusQuoter='ok';
            state.selection='category';
            //state.activeProduct={};
            state.activeProduct=undefined;
            state.activeCategory=payload;  
            //state.activeQuoter=undefined    
        },

        setQuoterProcess: ( state, { payload } ) => {
            state.quoterProcess=payload;                      
        },

        communicatingBackend: (state, { payload }) => { 
            //state: ok, communicating
            
            payload
                ? state.statusQuoter='communicating'
                : state.statusQuoter='ok'            
        },

        onErrorMessage: (state, {payload})=>{
            state.errorMessage= payload;
        },
        clearErrorMessage: (state)=>{
            state.statusQuoter='ok';
            state.errorMessage= undefined;
        },
        onSuccessMessage: (state, {payload})=>{
            state.successMessage= payload;
        },
        clearSuccessMessage: (state)=>{
            state.successMessage= undefined;
        },

        handleMobileOpen: (state, {payload})=>{
            console.log('estoy en handleMobileOpen ')
            state.mobileOpen= payload
        },
        setScreenCel: (state, {payload})=>{
            console.log('estoy en setScreenCel ', )
            state.isScreenCel= payload;
        },

       /* setDeleteQuoterProduct:(state, {payload})=>{
            console.log('estoy en setDeleteQuoterProduct ', )
            let newProductsList={...state.activeQuoter.products}
            delete newProductsList[payload]
            state.activeQuoter= {
                ...state.activeQuoter,
                products: {...newProductsList}
            };
        }, */
        
        setActiveQuoter:(state, {payload})=>{
            console.log('estoy en setActiveQuoter' , payload);
            state.activeQuoter=payload
        },
        setActiveQuoterToEdit:(state, {payload})=>{
            if(payload){
                const {title, description}=payload;
                console.log(' const {title, description}=payload; ',{title, description} )
                state.activeQuoterToEdit={title, description};   
            }          
        },

        setIsAddProductQuoterProcess: (state, {payload})=>{
            state.isAddProductQuoterProcess=payload;         
        },

        // Todo: Hacerlo en un helper 
        setProductsActiveQuoter:(state,{payload})=>{
            console.log('estoy en setProductsActiveQuoter ,', {payload})
            
            const {sku, quantity, total, title, pv}=payload;

            //if(state.activeQuoter.products.length==0){
            //    state.activeQuoter.products=[{sku, quantity, total, title, pv}];
            //    return
            //}

            if(state.activeQuoter.products.length===0)
                state.activeQuoter.products=[{sku, quantity, total, title, pv}]
                
            let newArrayProducts=[];
            let algo=state.activeQuoter.products.length;
            state.activeQuoter.products.map((productByQuoter, cont)=>{               
                if(productByQuoter)
                    if (productByQuoter.sku===sku){
                        console.log('********quantity ', quantity)
                        if( quantity>0) newArrayProducts.push({...productByQuoter, quantity, total, title, pv})
                    } else{
                        algo-=1;
                        newArrayProducts.push(productByQuoter);
                        //console.log('ALGO,state.activeQuoter.products.length ', algo,state.activeQuoter.products.length-1)
                        if(algo==0)
                        if( quantity>0)newArrayProducts.push({sku, quantity, total, title, pv})

                        //if (cont===state.activeQuoter.products.length-1)
                        //    newArrayProducts.push({sku, quantity, total, title, pv});
                 }
            
            });
            state.activeQuoter.products=newArrayProducts
        }, 


       /* onUpdateQuoter: ( state, { payload } ) => {
            state.quoters = state.quoters.map( quoter => {
                if ( quoter.id === payload.id ) {
                    return payload;
                }
                return quoter;
            });
            state.statusQuoter='ok';
            //state.productsLoaded='ok';
        }, */


        setPriceDiscountQuoter: (state, {payload}) => {
            state.priceDiscountQuoter= payload
        },


        setQuoterSelected: (state, {payload}) => {
            state.quoterSelected= payload
            state.activeQuoter= payload
            state.activeQuoterToEdit={title:payload.title, description: payload.description}
        },
    },
})

export const { 
    setOrderProducts,
    setActiveProduct,
    setActiveCategory,
    communicatingBackend,
    setCategories,
    setProducts,
    onErrorMessage,
    onSuccessMessage,
    clearErrorMessage,
    clearSuccessMessage,
    setActiveProductToEdit,
    
    setQuoterProcess,
    onUpdateProduct,
    onUpdateCategory,
    onAddNewQuoter,
    onAddNewProduct,
    onAddNewCategory,
    handleMobileOpen,
    setScreenCel,
    setActiveCategoryToAdd, 
    //setDeleteQuoterProduct,
    setActiveQuoter,
    setActiveQuoterToEdit,
    setIsAddProductQuoterProcess,
    setProductsActiveQuoter,
    //resetTemporalQuoter,
    //onUpdateQuoter,

    setPriceDiscountQuoter,

    setInitialProduct,
    setInitialQuoter,
    setDefaultInitalVariablesRedux,


    setQuoters,
    setQuotersDefault,
    setQuoterSelected,

    setNavBarSelection,

    onDeleteQuoter,
    onUpdateQuoters,

    onDeleteProduct,
    onDeleteCategory,
    setOnSaving,


 } = quoterSlice.actions