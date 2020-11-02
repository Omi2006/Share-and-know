function getCookie(name) {
    if (!document.cookie) {
        return null;
    }
    const token = document.cookie
        .split(";")
        .map(c => c.trim())
        .filter(c => c.startsWith(name + "="));

    if (token.length === 0) {
        return null;
    }
    return decodeURIComponent(token[0].split("=")[1]);
}

export async function fetchCsrf(url, body, method) {
    const response = await fetch(url, {
        method: method,
        mode: "same-origin",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
}
