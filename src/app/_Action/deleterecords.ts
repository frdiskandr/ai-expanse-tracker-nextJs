'use server';

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function daleteRecord(recordId: string): Promise<{
    message?: string
    error?: string
}> {
    const {userId} =  await auth();

    if(!userId){
        return {error: "User not found"}
    }

    try{
        await db.record.delete({
            where: {
                id: recordId,
                userId
            }
        })

        revalidatePath('/')

        return {message: "Record deleted"}
    }catch(e){
        console.error("Error deleting record",e)
        return {error: "Databases error"}
    }
}

export default daleteRecord