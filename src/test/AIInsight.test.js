import test from "node:test";
import assert from "node:assert/strict";
import {getAIInsights} from "../app/Action/getAllInsights"


test("aiInsight", async () => {
    try{
        const insight = await getAIInsights
        console.log(insight);
    }catch(e){
        console.log(e)
    }
})