'use server'
import { ExpanseRecord, generateAIAnswer } from "@/lib/ai";
import { CheckUser } from "@/lib/checkUser"
import { db } from "@/lib/db";

export async function generateInsightAnswer(question: string): Promise<string> {
    try {
        const user = await CheckUser()

        if (!user) {
            throw new Error("User not authenticated")
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const expenses = await db.record.findMany({
            where: {
                userId: user.clerkUserId,
                createdAt: {
                    gte: thirtyDaysAgo,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 50, // Limit to recent 50 expenses for analysis
        });

        // Convert to format expected by AI
        const expenseData: ExpanseRecord[] = expenses.map((expense) => ({
            id: expense.id,
            amount: expense.amount,
            category: expense.category || 'Other',
            description: expense.text,
            date: expense.createdAt.toISOString(),
        }));

        // Generate AI answer
        const answer = await generateAIAnswer(question, expenseData);
        return answer;
    } catch (e) {
        console.error(e)
        return  "I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.";
    }
}