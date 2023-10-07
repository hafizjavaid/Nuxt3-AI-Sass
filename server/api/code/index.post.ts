import OpenAI from "openai";
import { protectedRoute } from '~/server/utils';
import { User } from "~/server/types";

const config = useRuntimeConfig();
const openai = new OpenAI({
    apiKey: config.openaiKey
});
const instructionMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
};
export default defineEventHandler(async (event) => {

    await protectedRoute(event);
    const user = event.context.user as User

    const { messages } = await readBody(event);
    if (!openai.apiKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'OpenAI API Key not configured.',
        })
    }
    if (!messages) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Messages are required',
        })

    }
    const freeTrial = await checkApiLimit(user.id);
    const isPro = await checkSubscription(user.id)
    if (!freeTrial && !isPro) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Free trial has expired. Please upgrade to pro.',
        })

    }
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [instructionMessage, ...messages]
    })
    await incrementApiLimit(user.id);

    return response.choices[0].message

})