const stripe = require('stripe')('sk_test_rR8VRX6Jm99hnqLV1XMHDl3a00EOJxQSqo')

exports.handler = async (event) => {
    // TODO implement
    // const response = {
    // statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
    // body: JSON.stringify('Hello from Lambda!'),
    // };
    const { typeName, arguments } = event;
    if (typeName !== 'Mutation') {
        throw new Error('Request is not a function');
    }
    if (!arguments?.amount) {
        throw new Error('Amount is required');
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount : arguments.amount,
        currency: 'usd'
    });

     return { clientSecret: paymentIntent.client_secret };
};
