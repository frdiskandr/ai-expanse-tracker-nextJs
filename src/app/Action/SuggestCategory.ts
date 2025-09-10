'use server'

import { categorizeExpense } from "@/lib/ai"

export async function SuggestCategory(description: string): Promise<{ category: string; error?: string }> {
    try {
        if (!description || description.trim().length < 2) {
            return {
                category: "Other",
                error: "Description too short for AI analysis",
            }
        }

        const category = await categorizeExpense(description.trim());
        return { category }
    } catch (e) {
        console.error("Error in suggestCategory server action: ", e)
        return {
            category: "Other",
            error: "Unable to suggest category at this time"
        }
    }
}