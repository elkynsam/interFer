import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Interfer System API",
            version:"1.0.0",
            description: "API para sistema gestor Interfer",
            contact:{
                name: "Adrian Morataya",
                email: "ssoto-2023147@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/gestorInterfer/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/admin/*.js",
        "./src/company/*.js",
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs, swaggerUi }