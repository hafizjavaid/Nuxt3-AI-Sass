import Replicate from "replicate";
import { protectedRoute } from '~/server/utils';
const config = useRuntimeConfig();

const replicate = new Replicate({
    auth: config.replicateKey
})

export default defineEventHandler(async (event) => {

    await protectedRoute(event);
    const { prompt } = await readBody(event);
    if (!replicate.auth) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Replicate API Key not configured.',
        })
    }
    if (!prompt) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Prompt is required',
        })

    }
    const model = "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351"
    const response = await replicate.run(model, {
        input: {
            prompt
        }
    })

    return response

})