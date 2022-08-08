const configuration = (app) => {
    const CONFIG_ENVS = {
        'production': './production',
        'development': './development',
        'test': './test'
    }
    return require(CONFIG_ENVS[app.get('env')]).default;
}

export default configuration;

//TOSEE: env variables, how to use them, how they work, how they change depending of the enviroment