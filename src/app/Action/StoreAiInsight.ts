// 'use server'
// const SetAiInsights = (insight: string) => {
//     sessionStorage.setItem("ExpensesInsights", insight);
//     sessionStorage.setItem("useStorageInsight", "true")
// }

// const GetStorageInsight = () => {
//     const StorageInsight = sessionStorage.getItem("UseStorageInsight")
//     if (StorageInsight == "true") {
//         const insight = JSON.parse(sessionStorage.getItem("ExpensesInsights"))
//         return insight
//     }
//     return null
// }

// const SetUpdateStorageInsight = () => {
//     sessionStorage.setItem("UseStorageInsight", "false");
// }

// export { SetAiInsights, GetStorageInsight, SetUpdateStorageInsight };