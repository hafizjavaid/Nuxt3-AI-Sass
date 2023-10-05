import { User } from "~/server/types";
export default defineEventHandler(async (event) => {

    await protectedRoute(event);
    const user = event.context.user as User

    const apiCount = await getApiLimitCount(user.id)

    return {
        ...user,
        apiCount
    }
})