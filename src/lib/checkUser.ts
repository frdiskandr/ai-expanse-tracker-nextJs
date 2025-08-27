import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const CheckUser = async () => {
    const user = await currentUser();

    if(!user){
        return null
    }

    const logInUser = await db.user.findUnique({
        where:{
            clerkUserId: user.id
        }
    })

    if (logInUser){
        return logInUser
    }

    const newUser = await db.user.create({
        data: {
            clerkUserId: user.id,
            name: `${user.fullName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0]?.emailAddress
        }
    })

    return newUser
}