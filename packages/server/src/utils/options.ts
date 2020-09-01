/**
 * @fn moaiOptions
 * @param configuration JS configuration object
 * @desc Complete the configuration object with default values
 * @constructor
 */
const moaiOptions = (configuration: Partial<MoaiConfiguration> = {}): MoaiConfiguration => {

    //Get all the attributes
    const config: MoaiConfiguration = {
        port: 3050,
        enableCors: false,
        sessionSecret: Math.random().toString(),
        mongo: 'mongodb://mongodb0.example.com:27017/admin'
    };

    for (const attr in configuration)
        config[attr] = configuration[attr];

    return config;
};

export default moaiOptions;