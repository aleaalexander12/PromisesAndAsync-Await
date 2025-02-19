import { central, db1, db2, db3, vault } from "./databases.js";

const dbs = { db1, db2, db3 };

async function getUserData(id) {
    try {
        if (typeof id !== "number" || id < 1 || id > 10) {
            throw new Error("Invalid ID! Please enter a number between 1 and 10.");
        }

        const dbName = await central(id);
        const [basicInfo, personalInfo] = await Promise.all([
            dbs[dbName](id),
            vault(id)
        ]);

        return { id, ...basicInfo, ...personalInfo };
    } catch (error) {
        return { error: error.message };
    }
}

document.getElementById("fetchData").addEventListener("click", async () => {
    const userId = Number(document.getElementById("userId").value);
    const result = await getUserData(userId);
    document.getElementById("output").textContent = JSON.stringify(result, null, 2);
});
