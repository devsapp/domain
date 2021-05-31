"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    CONTEXT: 'FC-DOMAIN',
    DOMAIN: 'http://domain.devsapp.net',
    HINT: {
        loading: 'Get token....',
        success: 'End of request',
        error: 'Request failed',
    },
    RETRYOPTIONS: {
        retries: 5,
        factor: 2,
        minTimeout: 1 * 1000,
        randomize: true,
    },
    HELP: [
        {
            header: 'Options',
            optionList: [
                {
                    name: 'help',
                    description: '使用引导',
                    alias: 'h',
                    type: Boolean,
                },
            ],
        },
        {
            header: 'Examples',
            content: [
                {
                    // desc: 's exec -- get',
                    example: '$ s exec -- get',
                },
            ],
        },
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29uc3RhbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxrQkFBZTtJQUNiLE9BQU8sRUFBRSxXQUFXO0lBQ3BCLE1BQU0sRUFBRSwyQkFBMkI7SUFDbkMsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLGVBQWU7UUFDeEIsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixLQUFLLEVBQUUsZ0JBQWdCO0tBQ3hCO0lBQ0QsWUFBWSxFQUFFO1FBQ1osT0FBTyxFQUFFLENBQUM7UUFDVixNQUFNLEVBQUUsQ0FBQztRQUNULFVBQVUsRUFBRSxDQUFDLEdBQUcsSUFBSTtRQUNwQixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELElBQUksRUFBRTtRQUNKO1lBQ0UsTUFBTSxFQUFFLFNBQVM7WUFDakIsVUFBVSxFQUFFO2dCQUNWO29CQUNFLElBQUksRUFBRSxNQUFNO29CQUNaLFdBQVcsRUFBRSxNQUFNO29CQUNuQixLQUFLLEVBQUUsR0FBRztvQkFDVixJQUFJLEVBQUUsT0FBTztpQkFDZDthQUNGO1NBQ0Y7UUFDRDtZQUNFLE1BQU0sRUFBRSxVQUFVO1lBQ2xCLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSx5QkFBeUI7b0JBQ3pCLE9BQU8sRUFBRSxpQkFBaUI7aUJBQzNCO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQyJ9