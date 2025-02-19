const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function central(id) {
    if (typeof id !== "number") throw new Error("Invalid Input -- Not a Number");
    if (id < 1 || id > 10) throw new Error("Invalid Input -- Out of Range");

    await wait(100);
    return id > 7 ? "db3" : id > 4 ? "db2" : "db1";
}

export async function db1(id) {
    return fetchUserData(id, 1, 4);
}

export async function db2(id) {
    return fetchUserData(id, 5, 7);
}

export async function db3(id) {
    return fetchUserData(id, 8, 10);
}

export async function vault(id) {
    return fetchUserData(id, 1, 10, ["name", "email", "address", "phone"]);
}

async function fetchUserData(id, min, max, fields = ["username", "website", "company"]) {
    if (id < min || id > max) throw new Error(`ID out of range for database`);
    
    const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const json = await data.json();

    return Object.fromEntries(fields.map(field => [field, json[field]]));
}