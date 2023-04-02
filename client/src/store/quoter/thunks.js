import { quoterApi , quoterApiNode} from "../../api";
import { adapteQuoter, adapteQuotersArray } from "../../helpers/adapteQuoters";

import { adapteVariablesToNumber } from "../../helpers/adapteVariablesToNumber";
import { communicatingBackend, setActiveProductToEdit,
    setActiveProduct, onUpdateProduct,setProducts,onAddNewProduct,
    setActiveCategory, onUpdateCategory,setCategories,onAddNewCategory,
    setInitialProduct,
    
    onSuccessMessage, clearSuccessMessage,
    onErrorMessage, clearErrorMessage, 

      setQuoterProcess,
      //onUpdateQuoter,
      //setActiveQuoter,
      setQuoters,
      setInitialQuoter,
      onAddNewQuoter,
      //setActiveQuoterToEdit,
      onDeleteQuoter,
      onUpdateQuoters,
      setQuotersDefault,
      setQuoterSelected,
      onDeleteProduct,
      onDeleteCategory,
      setActiveQuoter,
      setActiveQuoterToEdit
    } from "./quoterSlice";

/******************************** Loading Inital Data  **********************************************/

export const startLoadingProducts=()=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{ 


            const {data} = await quoterApi.get('/products/find');
            console.log('/----sdsds-data****** PRODUCTS',data)
            const {user, isactive, category, ...resto}=data[0];
            const productToEdit={ ...resto, categoryId: category.id};
            dispatch(setActiveProductToEdit(productToEdit));
            dispatch(setInitialProduct(data[0]));
            dispatch(setActiveProduct(data[0]));
            dispatch(setProducts(data));   
        }catch(error){
            const errorMessage=existError(error, 'loading products ');
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false))
        
    }
}

export const startLoadingCategories=()=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{ 
            const {data} = await quoterApi.get('/categories/find');
            dispatch(setCategories(data))
        }catch(error){
            const errorMessage=existError(error, 'loading categories ')
            dispatch(onErrorMessage(errorMessage))

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false))
    }
}

export const startLoadingQuotersDefault=(products)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {data} = await quoterApiNode.get('/quoters/default/');
            console.log('data ... InitialQuoters', data)
            const quotersAdapted= adapteQuotersArray(data, products)
            dispatch(setQuotersDefault(quotersAdapted))
            dispatch(setInitialQuoter({...quotersAdapted[0], isDefaultQuoter: true}))
            dispatch(setQuoterSelected({...quotersAdapted[0], isDefaultQuoter: true}))
        }catch(error){
            console.log('error startLoadingQuotersDefault', error)
            dispatch(onErrorMessage('error loading Quoters Default, talk with the admin'))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false))
    }
}

export const startLoadingQuoters=(idUser, products)=>{
    console.log('******buscando quoters del usuario idUser', idUser)
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{ 
            //const {data} = await quoterApi.get('/products/find');

            const {data} = await quoterApiNode.get('/quoters/idUser/'+idUser);
            console.log('****** Quoters by user', data)
            const quotersAdapted= adapteQuotersArray(data, products)
            dispatch(setQuoters(quotersAdapted))
            if(quotersAdapted.length>0){
                //dispatch(setInitialQuoter(quotersAdapted[0]))
                //dispatch(setQuoterSelected(quotersAdapted[0]))
                //dispatch(setActiveQuoterToEdit(quotersAdapted[0]))
            }
            
            //dispatch(setActiveQuoter(data[0]))
        }catch(error){
            const errorMessage=existError(error, 'loading loading quoters')
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false))
    }
}


/******************************** Categories Manage **********************************************/

export const startCreateCategory=(category)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {data} = await quoterApi.post('/categories/create', category);
            dispatch(setActiveCategory(data));
            dispatch(onAddNewCategory(data))
            dispatch(setQuoterProcess('View'));
            dispatch(onSuccessMessage('Category created'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error es ', error)
            
            const errorMessage= existError(error,'Category ', `title: ${category.title}`);
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startUpdateCategory=(category)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {id, isactive, user, ...categoryToUpdate}=category;
            const {data} = await quoterApi.patch('/categories/edit/'+id, categoryToUpdate);
            dispatch(setActiveCategory(data))
            dispatch(onUpdateCategory(data));
            dispatch(onSuccessMessage('Category updated'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
                  

        }catch(error){

            const errorMessage= existError(error, 'category ', `id: ${category.id} `)
            dispatch(onErrorMessage(errorMessage))
        
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false));
    }
}

export const startDeleteCategory= (idCategoryToDelete)=>{
    return async (dispatch) =>{
        try{
            const {data} = await quoterApi.delete('/categories/delete/'+idCategoryToDelete);
            dispatch(onDeleteCategory(idCategoryToDelete))
            dispatch(onSuccessMessage(`category deleted`));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error es ', error)
            const errorMessage=existError(error,'Category ', `id: ${idCategoryToDelete}`)
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}



/******************************** Products Manage **********************************************/

export const startCreateProduct=(product)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{            
            const {id, ...productToCreate}=product;
            const dataAdapted= adapteVariablesToNumber(productToCreate);
            const {data} = await quoterApi.post('/products/create', dataAdapted);
            dispatch(setActiveProduct(data));
            const {user, category, ...resto }=data;
            dispatch(setActiveProductToEdit({...resto, categoryId:category.id})) 
            dispatch(onAddNewProduct(data))
            dispatch(setQuoterProcess('View'));  
            dispatch(onSuccessMessage('Product created'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            
            const errorMessage=existError(error,'Product ', `title: ${product.title}`)
            console.log('onErrorMessage ,', errorMessage)
            dispatch(onErrorMessage(errorMessage))

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startUpdateProduct=(product, category)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {id, isactive, ...productToUpdate}=product;
            const dataAdapted= adapteVariablesToNumber(productToUpdate);
            const {data} = await quoterApi.patch('/products/edit/'+id, dataAdapted);
            let productUpdated={};
            (data.category.id)
                ? productUpdated={...data}
                : productUpdated={...data, category}
            
            dispatch(setActiveProduct(productUpdated))
            const {user, category, ...resto }=productUpdated;
            dispatch(setActiveProductToEdit({...resto, categoryId:category.id}))  
            dispatch(onUpdateProduct(productUpdated));
            dispatch(onSuccessMessage('Product Updated'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);

        }catch(error){
            const errorMessage= existError(error,'Product ', `id: ${product.id}`);
            dispatch(onErrorMessage(errorMessage));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false));
    }
}

export const startDeleteProduct=(idProductToDelete)=>{
    return async (dispatch) =>{
        try{
            console.log('to delete ', '/products/'+idProductToDelete)
            const {data} = await quoterApi.delete('/products/delete/'+idProductToDelete);
            console.log('data response delete ', {data});
            console.log(' dispatch(onDeleteQProduct');
            dispatch(onDeleteProduct(idProductToDelete))
            console.log(' Success message');
            dispatch(onSuccessMessage(`Product deleted`));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            console.log('error es ', error)
            const errorMessage=existError(error,'Product ', `id: ${idProductToDelete}`)
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startUploadingFiles = (files=[], activeProduct, ) => {
 

    const formData=new FormData();
    formData.append('file',files[0]);

    return async(dispatch, getState)=>{
        dispatch(communicatingBackend(true));        
        const {id}=activeProduct;
        try{
            const {data} = await quoterApi.patch('/files/product/'+id, formData);

            const productUpdated={
                ...activeProduct,
                image: data.image,
                user: data.user,
            }

            const {user, category, ...resto }=productUpdated;

            dispatch(setActiveProduct(productUpdated))
            dispatch(setActiveProductToEdit({...resto, categoryId:category.id}))  
            dispatch(onUpdateProduct(productUpdated));      
            dispatch(onSuccessMessage('Image uploaded'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        
        
        }catch(error){
            const errorMessage=existError(error,'Image ')
            dispatch(onErrorMessage(errorMessage))

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }

        dispatch(communicatingBackend(false));
    }
}


/******************************** Quoters Manage **********************************************/


export const startCreateQuoter=(quoter, products)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            const {data} = await quoterApiNode.post('/quoters/create', {...quoter, image:""});
            const quoterAdapted= adapteQuoter(data[0], products)
            dispatch(onAddNewQuoter(quoterAdapted))
            dispatch(onSuccessMessage('Quoter created'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            const messageError= existQuoterError(error);
            dispatch(onErrorMessage(messageError));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startUpdateQuoter=(quoter, products)=>{
    return async(dispatch) =>{
        dispatch(communicatingBackend(true))
        try{
            console.log('************************ update QUoter')
            const {data}= await quoterApiNode.put('/quoters/edit/'+quoter.id, {image:"", ...quoter });
            console.log('****** data UPDATE ', data);
            const quoterAdapted= adapteQuoter(data[0], products);
            console.log('***** data quoterADAPTED ', quoterAdapted);
            dispatch(onUpdateQuoters(quoterAdapted));
            dispatch(onSuccessMessage('Quoter updated'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
    
            const messageError= existQuoterError(error);
            dispatch(onErrorMessage(messageError));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);

        }
        dispatch(communicatingBackend(false));  

    }
}

export const startDeleteQuoter=(idQuoterToDelete)=>{
    return async (dispatch) =>{
        try{
            const {data} = await quoterApiNode.delete('/quoters/delete/'+idQuoterToDelete);
            dispatch(onDeleteQuoter(idQuoterToDelete))
            dispatch(onSuccessMessage(`Quoter deleted`));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            const messageError= existQuoterError(error);
            dispatch(onErrorMessage(messageError));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}

export const startUploadingImageQuoter=(files=[], products=[])=>{
    return async(dispatch, getState)=>{
        dispatch(communicatingBackend(true));
        const {activeQuoter} = getState().quoter;
        const formData=new FormData();
        formData.append('archivo',files[0]);
        try{
            const {data} = await quoterApiNode.put('/files-quoters/edit/'+activeQuoter.id, formData);
            console.log('******* data update image');
            console.log('*******', data)
            const quoterAdapted= adapteQuoter(data, products)
            dispatch(setActiveQuoter(quoterAdapted))
            dispatch(setActiveQuoterToEdit({title:quoterAdapted.title, description:quoterAdapted.description}))  

            dispatch(onUpdateQuoters(quoterAdapted));
            dispatch(onSuccessMessage('Quoter Image upload'));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
        }catch(error){
            const messageError= existQuoterError(error);
            dispatch(onErrorMessage(messageError));
            console.log(' --- 999999 error update image');
            console.log('---- 999999', error)

            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false));
    }
}

export const startExecuteSeed=(quotersDefault)=>{
    return async (dispatch) =>{
        dispatch(communicatingBackend(true));

        try{
            console.log('executing SEED')
            const {data}=await quoterApi.get('/seed');
            dispatch(onSuccessMessage(`SEED EXECUTED`));
            setTimeout(()=>{
                dispatch(clearSuccessMessage());
            },10);
            console.log('seed executed ', data)


            dispatch(startLoadingProducts())
            dispatch(startLoadingCategories())
            dispatch(setQuoters([]))
            dispatch(setInitialQuoter({...quotersAdapted[0], isDefaultQuoter: true}))

            
        }catch(error){
            console.log('error es ', error)
            const errorMessage=existError(error,'SEED ', ` Error `)
            dispatch(onErrorMessage(errorMessage))
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);
        }
        dispatch(communicatingBackend(false)); 
    }
}
/******************************** Common Function **********************************************/
const existError=(error, type='', detail='')=>{
    console.log('error  existError', error); 
    if (error.response){
        if(error.response.status==403) return `Not available for your role`
        if(error.response.status==404) return `${type}${detail} don't exist in the data base`;
        if(error.response.status==410) return `${type}${detail} was deleted, you must talk to the admin to reactivate it`
        if(error.response.status==400) return error.response.data.message.toString()
        return 'error'
    }else{
        return 'Network error'
    }             
}

const existQuoterError=(error)=>{
    console.log('error ', error)
    try{
        return error.response
            ? error.response.data.errors[0].message
            : 'Network Error Backend' ;
    }catch{
        return 'ERROR BACKEND, message dont exist'
    }
    
}


    
