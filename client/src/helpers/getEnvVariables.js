export const getEnvVariables = () => {
    //import.meta.env;
    return {
        VITE_API_URL_NEST: import.meta.env.VITE_API_URL_NEST,
        VITE_API_URL_NEST_DEV: import.meta.env.VITE_API_URL_NEST_DEV,
        VITE_API_URL_NODE_DEV: import.meta.env.VITE_API_URL_NODE_DEV,
        VITE_API_STAGE: import.meta.env.VITE_API_STAGE,

        //...import.meta.env
    }
} 

