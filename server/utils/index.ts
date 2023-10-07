import { H3Event } from 'h3';
import { serverSupabaseUser } from '#supabase/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
export const MAX_COUNT = 5
export const protectedRoute = async (event: H3Event) => {
    const user = await serverSupabaseUser(event);

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }
    event.context.user = user

};

export const incrementApiLimit = async (userId: string) => {

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: { userId: userId },
    });

    if (userApiLimit) {
        await prisma.userApiLimit.update({
            where: { userId: userId },
            data: { count: userApiLimit.count + 1 },
        });
    } else {
        await prisma.userApiLimit.create({
            data: { userId: userId, count: 1 },
        });
    }


}

export const checkApiLimit = async (userId: string) => {

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: { userId: userId },
    });

    if (!userApiLimit || userApiLimit.count < MAX_COUNT) {
        return true;
    } else {
        return false;
    }
};

export const getApiLimitCount = async (userId: string) => {


    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userApiLimit) {
        return 0;
    }

    return userApiLimit.count;
};

const config = useRuntimeConfig();
export const stripe = new Stripe(config.stripeSecret, {
    apiVersion: '2023-08-16',
    typescript: true
});

export function absoluteUrl(path: string) {
    return `${config.appUrl}${path}`
}
const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (userId: string) => {
    const userSubscription = await prisma.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true
        }
    })

    if (!userSubscription) {
        return false;
    }

    const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()


    // For returning the boolean value 
    return !!isValid;
}