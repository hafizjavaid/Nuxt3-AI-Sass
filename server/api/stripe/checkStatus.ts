import { PrismaClient } from '@prisma/client';
import { User } from "~/server/types";

const prisma = new PrismaClient();
const DAY_IN_MS = 86_400_000;

export default defineEventHandler(async (event) => {

    await protectedRoute(event);
    const user = event.context.user as User

    const userSubscription = await prisma.userSubscription.findUnique({
        where: {
            userId: user.id,
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true
        }
    })

    console.log('[USER_SUBSCRIPTION]', userSubscription);


    if (!userSubscription) {
        return false;
    }

    const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

    console.log('[IS_VALID]', isValid);

    // For returning the boolean value 
    return !!isValid;
})