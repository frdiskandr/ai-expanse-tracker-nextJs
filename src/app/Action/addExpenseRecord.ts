'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

interface RecordData {
    text: string,
    amount: number,
    category: string,
    date: string,
}

interface RecordResult {
    data?: RecordData;
    error?: string;
}

const AddExpanseRecord = async (formData: FormData): Promise<RecordResult> => {
    const textValue = formData.get('text');
    const amountValue = formData.get("amount");
    const categoryValue = formData.get('category');
    const dateValue = formData.get('date');

    if (!textValue ||
        textValue === '' ||
        !amountValue ||
        !categoryValue ||
        categoryValue === '' ||
        !dateValue ||
        dateValue === '') {
        return { error: "Text, amount, category, or date is missing" };
    }

    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString());
    const category: string = categoryValue.toString();

    let date: string;

    try {
        const inputDate = dateValue.toString();
        const [year, month, day] = inputDate.split("-");
        const dateObj = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0))
        date = dateObj.toISOString()
    } catch (e) {
        console.error("invalid date format ", e)
        return { error: "Invalid Date format" };
    }

    const { userId } = await auth();
    console.error(userId)

    if (!userId) {
        return { error: "User Not Found!!" }
    }

    try {
        const data = {
            text,
            amount,
            category,
            date,
            userId,
        };

        const createRecord = await db.record.create({
            data: data
        })

        const recordData: RecordData = {
            text: createRecord.text,
            amount: createRecord.amount,
            category: createRecord.category,
            date: createRecord.date?.toString() || date
        }

        revalidatePath("/")

        return { data: recordData }
    } catch (e) {
        console.error("error adding expense record", e)
        return { error: "An unexpected error occured while adding teh expense record" }
    }

}

export default AddExpanseRecord;