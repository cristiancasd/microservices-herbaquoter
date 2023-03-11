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
            pricepublic: 132000,
            price15:114624,
            price25:103041,
            price35:91457,
            price42:83349,
            price50:74082,
            description: 'Cuentas con 10 sabores diferentes',    
            image: 'batido.jpg',
            pv: 23.95,
            sku: '0146', 
            categoryId:''
        },

        {
            title: 'Multivitaminico',
            pricepublic: 54000,
            price15:46892,
            price25:42153,
            price35:37414,
            price42:34097,
            price50:30306,
            description: 'Refuerzo de micronutrientes',    
            image: 'multivitaminico.jpg',
            pv: 10,
            sku: '3122', 
            categoryId:''
        },

        {
            title: 'X-tra Cal Advanced',
            pricepublic: 55000,
            price15:47760,
            price25:42934,
            price35:38107,
            price42:34729,
            price50:30868,
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
            pricepublic: 110000,
            price15:95521,
            price25:85868,
            price35:76215,
            price42:69458,
            price50:61735,
            description: 'Ayuda a tu transido digestivo',    
            image: 'fibra.jpg',
            pv: 22.95,
            sku: '2863', 
            categoryId:''
        },

        {
            title: 'Herbal Aloe',
            pricepublic: 134000,
            price15:116361,
            price25:104602,
            price35:92844,
            price42:84612,
            price50:75205,
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
            pricepublic: 99000,
            price15:85968,
            price25:77280,
            price35:68593,
            price42:62511,
            price50:55561,
            description: 'Proteína aislada de soya baja en calorías',    
            image: 'proteinaPersonalizada.jpg',
            pv: 17.95,
            sku: '2864', 
            categoryId:''
        },

        {
            title: 'Proteína PDM',
            pricepublic: 166000,
            price15:145400,
            price25:131900,
            price35:118259,
            price42:108711,
            price50:97800,
            description: 'Proteína de vainilla, refuerzo para el musculo',    
            image: 'pdm.jpg',
            pv: 30.80,
            sku: '2865', 
            categoryId:''
        },

        {
            title: 'Barras de proteína',
            pricepublic: 97000,
            price15:88750,
            price25:83200,
            price35:77700,
            price42:73900,
            price50:69400,
            description: 'Snacks de proteína',    
            image: 'barras.jpg',
            pv: 15,
            sku: '2866', 
            categoryId:''
        },

        {
            title: 'Crocoante de proteína',
            pricepublic: 133000,
            price15:118000,
            price25:108000,
            price35:98000,
            price42:91000,
            price50:83000,
            description: 'Topic de proteína crocante para que agregues a tus preparaciones',    
            image: 'crocante.jpg',
            pv: 26.15,
            sku: '2867', 
            categoryId:''
        },
        {
            title: 'Rebuild Strenght',
            pricepublic: 277000,
            price15:220500,
            price25:219200,
            price35:196100,
            price42:179900,
            price50:161400,
            description: 'Reconstructor muscular postentreno',    
            image: 'rebuild.jpg',
            pv: 52.10,
            sku: '2868', 
            categoryId:''
        },

        {
            title: 'Beverage Mix',
            pricepublic: 113000,
            price15:100500,
            price25:92200,
            price35:83800,
            price42:78000,
            price50:71300,
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
            pricepublic: 173000,
            price15:150250,
            price25:135100,
            price35:119900,
            price42:109300,
            price50:97100,
            description: 'Bebida herbal de té verde, negro y hierbas naturales',    
            image: 'bebidaHerbal102.jpg',
            pv: 34.95,
            sku: '2869', 
            categoryId:''
        },
        {
            title: 'Bebida Herbal 51gr',
            pricepublic: 101000,
            price15:87700,
            price25:78850,
            price35:70000,
            price42:63800,
            price50:56700,
            description: 'Bebida herbal de té verde, negro y hierbas naturales',    
            image: 'bebidaHerbal51.jpg',
            pv: 19.95,
            sku: '2870', 
            categoryId:''
        },
        {
            title: 'N.R.G',
            pricepublic: 79000,
            price15:62500,
            price25:61700,
            price35:54735,
            price42:49900,
            price50:44350,
            description: 'Extracto de guaraná y té negro',    
            image: 'nrg.jpg',
            pv: 14.75,
            sku: '2871', 
            categoryId:''
        },
        {
            title: 'Infusión Herbal',
            pricepublic: 184000,
            price15:159800,
            price25:143700,
            price35:127500,
            price42:116200,
            price50:103300,
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
            pricepublic: 158000,
            price15:137950,
            price25:85900,
            price35:76250,
            price42:69500,
            price50:61800,
            description: 'Protege tu piel y articulaciones',    
            image: 'colageno.jpg',
            pv: 29.00,
            sku: '2873', 
            categoryId:''
        },
        {
            title: 'Herbalifeline',
            pricepublic: 139000,
            price15:120700,
            price25:108500,
            price35:96300,
            price42:87800,
            price50:78000,
            description: 'Acidos grasos esenciales',    
            image: 'herbalifeline.jpg',
            pv: 25.75,
            sku: '2874', 
            categoryId:''
        },

        {
            title: 'Cr7 Drive',
            pricepublic: 135000,
            price15:107850,
            price25:107250,
            price35:96150,
            price42:88350,
            price50:79450,
            description: 'Hidratante deportivo',    
            image: 'cr7drive.jpg',
            pv: 24.90,
            sku: '2875', 
            categoryId:''
        },
    ],
}