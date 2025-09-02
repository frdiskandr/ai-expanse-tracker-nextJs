'use server';
import { db } from '@/lib/db';
import { Record } from '@/types/record';
import { auth } from '@clerk/nextjs/server'

async function GetRecords(): Promise<{
    records?: Record[]
    error?: string
}> {
    const { userId } = await auth();

    if (!userId) {
        return { error: "User not found!" }
    }

    try {
        const records = await db.record.findMany({
            where: {
                userId
            },
            orderBy: {
                date: 'desc'
            },
            take: 10
        })

        return { records }
    } catch (e) {
        console.error("Error fetching records ", e)
        return { error: "Databases error" }
    }
}

export default GetRecords