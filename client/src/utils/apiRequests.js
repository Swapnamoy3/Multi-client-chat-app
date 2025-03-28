
async function getRequest(URL, params = {}){
    const response = await fetch(URL, { ...params });
    const data = await response.json();
    return data;
} 

async function postRequest(URL, body, params = {}){
    const response = await fetch(URL, {
        method: "POST",
        credentials: "include", // essential for sending/receiving cookies
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        ...params
    });

    const data = await response.json();
    return data;
}

export {getRequest, postRequest}