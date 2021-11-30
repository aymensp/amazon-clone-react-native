export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "amazonclone75c795ce": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "amazonclone": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "StripeWebHook": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "function": {
        "CreatePaymentIntent": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "StripeWebHook": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}