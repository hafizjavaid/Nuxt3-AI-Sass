import { H3Event } from 'h3';
import { serverSupabaseUser } from '#supabase/server';

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