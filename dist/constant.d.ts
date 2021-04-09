declare const _default: {
    CONTEXT: string;
    DOMAIN: string;
    HINT: {
        loading: string;
        success: string;
        error: string;
    };
    RETRYOPTIONS: {
        retries: number;
        factor: number;
        minTimeout: number;
        randomize: boolean;
    };
    HELP: ({
        header: string;
        optionList: {
            name: string;
            description: string;
            alias: string;
            type: BooleanConstructor;
        }[];
        content?: undefined;
    } | {
        header: string;
        content: {
            example: string;
        }[];
        optionList?: undefined;
    })[];
};
export default _default;
