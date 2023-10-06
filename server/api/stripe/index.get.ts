import { User } from "~/server/types";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const returlUrl = absoluteUrl('/settings');
export default defineEventHandler(async (event) => {

    await protectedRoute(event);
    const user = event.context.user as User

    const userSubscription = await prisma.userSubscription.findUnique({
        where: {
            userId: user.id
        }
    })

    // Cancel or Upgrade Subscription
    if (userSubscription && userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returlUrl
        })
        console.log(stripeSession.url);

        return {
            url: stripeSession.url
        }




    }
    // New Subscription
    const stripeSession = await stripe.checkout.sessions.create({
        success_url: returlUrl,
        cancel_url: returlUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.email,
        line_items: [
            {
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Genius Pro",
                        description: "Unlimited AI Generations"
                    },
                    unit_amount: 2000, // $20 
                    recurring: {
                        interval: "month"
                    }
                },
                quantity: 1,
            },
        ],
        metadata: {
            userId: user.id,
        },
    })
    console.log(stripeSession.url);
    return {
        url: stripeSession.url
    }
})