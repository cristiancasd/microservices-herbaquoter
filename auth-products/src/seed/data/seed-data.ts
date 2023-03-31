//import * as bcrypt from 'bcrypt';
import {hashSync} from 'bcrypt'

interface SeedCategory {
    title: string,
    description: string
}

interface SeedProduct {
    title: string;
    pricepublic:number;
    price15:number;
    price25:number;
    price35:number;
    price42:number;
    price50:number;
    description: string;    
    image: string;    
    sku: string;   
    pv: number;
    categoryId:string;
}

interface SeedUser{
    
    email: string;
    password: string;
    fullname: string;
    rol: string;
    country: string;
    image: string;
    herbalifelevel: string;
}

interface SeedData {
    users: SeedUser[];
    categories: SeedCategory[];
    productsNutrition: SeedProduct[];
    productsProtein: SeedProduct[];
    productsDigestivos: SeedProduct[];
    productsTeas: SeedProduct[];
    productsOthers: SeedProduct[];
}


export const initialData: SeedData = {

    users:[
        {
            email: 'user@test.com',
            fullname: 'Jaime Test',
            password: hashSync('Abc123',10),
            rol: 'user',
            country: 'Colombia',
            herbalifelevel: 'distribuidor-35',
            image:'user.jpg'
        },
        {
            email: 'admin@test.com',
            fullname: 'Sofia admin Test',
            password: hashSync('Abc123',10),
            rol: 'admin',
            country: 'Italia',
            herbalifelevel: 'distribuidor-42',
            image: 'admin.jpg'
        },
        {
            email: 'super-admin@test.com',
            fullname: 'Camilo super-admin test',
            password: hashSync('Abc123',10),
            rol: 'super-admin',
            country: 'Inglaterra',
            herbalifelevel: 'supervisor',
            image: 'super-admin.jpg'
        },
    ],

    categories:[
        {
            title: 'Nutrición Básica',
            description: 'Dale a tu cuerpo todos los nutrientes que necesita'
        },
        {
            title: 'Proteínas',
            description: 'Salud muscular'
        },
        {
            title: 'Salud Digestiva',
            description: 'Productos que te ayudaran a mejorar tu digestión'
        },
        {
            title: 'Bébidas de Té',
            description: 'Té instantaneos con grandes beneficios'
        },
        {
            title: 'Nutrición Específica',
            description: 'Productos con funcionalidades especificas'
        },
    ],

    productsNutrition:[
        {
            title: 'Batido Nutricional',
            pricepublic: 141000,
            price15:122300,
            price25:109800,
            price35:97300,
            price42:88600,
            price50:78600,
            description: 'Cuentas con 10 sabores diferentes',    
            image: 'batido.jpg',
            pv: 23.95,
            sku: '0146', 
            categoryId:''
        },

        {
            title: 'Multivitaminico',
            pricepublic: 58000,
            price15:50300,
            price25:45200,
            price35:40100,
            price42:36500,
            price50:32400,
            description: 'Refuerzo de micronutrientes',    
            image: 'multivitaminico.jpg',
            pv: 10,
            sku: '3122', 
            categoryId:''
        },

        {
            title: 'X-tra Cal Advanced',
            pricepublic: 59000,
            price15:51200,
            price25:46000,
            price35:40800,
            price42:37100,
            price50:32900,
            description: 'Refuerzo calcio con vitaminas para una mejor absorción',    
            image: 'xtraCal.jpg',
            pv: 10.25,
            sku: '3123', 
            categoryId:''
        },

    ],

    productsDigestivos:[
   

        {
            title: 'Fibra Activa',
            pricepublic: 117000,
            price15:101500,
            price25:91100,
            price35:80800,
            price42:73500,
            price50:65200,
            description: 'Ayuda a tu transido digestivo',    
            image: 'fibra.jpg',
            pv: 22.95,
            sku: '2863', 
            categoryId:''
        },

        {
            title: 'Herbal Aloe',
            pricepublic: 117000,
            price15:124000,
            price25:111340,
            price35:98700,
            price42:89800,
            price50:79700,
            description: 'Beneficios de la sabila para salud del colon',    
            image: 'aloe.jpg',
            pv: 24.95,
            sku: '0006', 
            categoryId:''
        },
    ],

    productsProtein:[
        {
            title: 'Proteína personalizada',
            pricepublic: 105000,
            price15:91100,
            price25:81800,
            price35:73500,
            price42:66000,
            price50:58500,
            description: 'Proteína aislada de soya baja en calorías',    
            image: 'proteinaPersonalizada.jpg',
            pv: 17.95,
            sku: '2864', 
            categoryId:''
        },

        {
            title: 'Proteína PDM',
            pricepublic: 177000,
            price15:155200,
            price25:140700,
            price35:126100,
            price42:116000,
            price50:104300,
            description: 'Proteína de vainilla, refuerzo para el musculo',    
            image: 'pdm.jpg',
            pv: 30.80,
            sku: '2865', 
            categoryId:''
        },

        {
            title: 'Barras de proteína',
            pricepublic: 103000,
            price15:94700,
            price25:89200,
            price35:83700,
            price42:79800,
            price50:75400,
            description: 'Snacks de proteína',    
            image: 'barras.jpg',
            pv: 15,
            sku: '2866', 
            categoryId:''
        },

        {
            title: 'Crocoante de proteína',
            pricepublic: 142000,
            price15:126000,
            price25:115300,
            price35:104600,
            price42:97200,
            price50:88600,
            description: 'Topic de proteína crocante para que agregues a tus preparaciones',    
            image: 'crocante.jpg',
            pv: 26.15,
            sku: '2867', 
            categoryId:''
        },
        {
            title: 'Rebuild Strenght',
            pricepublic: 295000,
            price15:258100,
            price25:233500,
            price35:208900,
            price42:191600,
            price50:171900,
            description: 'Reconstructor muscular postentreno',    
            image: 'rebuild.jpg',
            pv: 52.10,
            sku: '2868', 
            categoryId:''
        },

        {
            title: 'Beverage Mix',
            pricepublic: 120000,
            price15:106800,
            price25:97900,
            price35:89000,
            price42:82800,
            price50:75800,
            description: 'Bebida refrescante de proteína',    
            image: 'beverage.jpg',
            pv: 22.15,
            sku: '2069', 
            categoryId:''
        },
    ],

    productsTeas: [
        {
            title: 'Bebida Herbal 102gr',
            pricepublic: 184000,
            price15:160000,
            price25:143400,
            price35:127000,
            price42:109300,
            price50:115600,
            description: 'Bebida herbal de té verde, negro y hierbas naturales',    
            image: 'bebidaHerbal102.jpg',
            pv: 34.95,
            sku: '2869', 
            categoryId:''
        },
        {
            title: 'Bebida Herbal 51gr',
            pricepublic: 108000,
            price15:93700,
            price25:84100,
            price35:74600,
            price42:67900,
            price50:60200,
            description: 'Bebida herbal de té verde, negro y hierbas naturales',    
            image: 'bebidaHerbal51.jpg',
            pv: 19.95,
            sku: '2870', 
            categoryId:''
        },
        {
            title: 'N.R.G',
            pricepublic: 84000,
            price15:72900,
            price25:65500,
            price35:58000,
            price42:52800,
            price50:47000,
            description: 'Extracto de guaraná y té negro',    
            image: 'nrg.jpg',
            pv: 14.75,
            sku: '2871', 
            categoryId:''
        },
        {
            title: 'Infusión Herbal',
            pricepublic: 196000,
            price15:170000,
            price25:152700,
            price35:135300,
            price42:123100,
            price50:109300,
            description: 'Bebida para relajarse y dormir mejor',    
            image: 'infusionHerbal.jpg',
            pv: 37.65,
            sku: '2872', 
            categoryId:''
        },
    ],

    productsOthers: [
        {
            title: 'Colágeno Hidrolizado',
            pricepublic: 168000,
            price15:138000,
            price25:132500,
            price35:118300,
            price42:108400,
            price50:97000,
            description: 'Protege tu piel y articulaciones',    
            image: 'colageno.jpg',
            pv: 29.00,
            sku: '2873', 
            categoryId:''
        },
        {
            title: 'Herbalifeline',
            pricepublic: 148000,
            price15:128400,
            price25:115300,
            price35:102200,
            price42:93000,
            price50:82500,
            description: 'Acidos grasos esenciales',    
            image: 'herbalifeline.jpg',
            pv: 25.75,
            sku: '2874', 
            categoryId:''
        },

        {
            title: 'Cr7 Drive',
            pricepublic: 144000,
            price15:126300,
            price25:114400,
            price35:102600,
            price42:94300,
            price50:84800,
            description: 'Hidratante deportivo',    
            image: 'cr7drive.jpg',
            pv: 24.90,
            sku: '2875', 
            categoryId:''
        },
    ],
}