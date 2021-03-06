exports.handler = async (event) => {
  // TODO implement

  const body = JSON.parse(event.body);

  switch (body.type) {
    case "payment_intent.succeeded":
      const paymentIntent = body.data.object;
      console.log("PaymentIntent was successful!");
      break;
    case "payment_method.attached":
      const paymentMethod = body.data.object;
      console.log("PaymentMethod was attached to a Customer!");
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${body.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event

  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify({recieved : true}),
  };
  return response;
};
