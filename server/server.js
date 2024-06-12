import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'

const app = express(); //app is the instance of express
const stripe = new Stripe('sk_test_51NOvqGSAvExKFAjaTkSgqxNXs5WQ8TofJQrBOJIhdkFNDBKzqbWwMSYYzbsfP6ozzQ1n3sljsSbCVHYnMhcePzGz00PbYWzMiX');

app.use(cors());
app.use(express.json());

//http://localhost:2000
app.get('/',(req,res)=>{
    res.send("Hello from server")
})
app.get('/products',(req,res)=>{
    res.send("products")
})



app.post("/create-payment-intent", async (req, res) => {
    console.log(req.body)
  const { amount } = req.body; //50.00
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount*100, 
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


//mail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,secure: false,
  auth: {
    user: "harshita.logicrays@gmail.com",
    pass: "knpf neqw tvcp ykzt",},
});

app.post('/mail',async(req,res)=>{
  let {email,status,name,amount} =  req.body
  try{
    const info = await transporter.sendMail({
      from: '"Admin" <harshita.logicrays@gmail.com>', // sender address
      to: email, // list of receivers
      subject: `your order has been ${status}`, // Subject line
            text:  `Hello ${name}`, // plain text body
            html: `<b>Thank you for ordering from us </b><br> Amount = ${amount}<br/>
                    Order Status : ${status}<br/>
                    Payment:online<br/>
                    Thank You<br/>Admin `, // html body
    });
   res.send({'message':'Mail Sent'}) }
  catch(err){res.send({'message':'Something went wrong'}) }
})

const PORT =  2000
app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));