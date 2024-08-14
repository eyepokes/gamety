import {request} from "./utils";

const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "bg-BG,bg;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "User-Agent": "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.64 Mobile Safari/537.36"
}

export async function userInfo(token: string) {
    return await request("GET", "https://gamety-clicker-api.metafighter.com/api/v1/user/?request_date=" + getDate(), {
        ...headers,
        "authorization": token
    }, false);
}

export async function click(token: string, click_number: number) {
    return await request("POST", "https://gamety-clicker-api.metafighter.com/api/v1/actions/click/", {
        ...headers,
        "Content-Type": "application/json",
        "authorization": token
    }, false, JSON.stringify({click_number, click_date: getDate()}));
}

export async function skill(token: string, skill_type: "mid" | "hard") {
    return await request("POST", "https://gamety-clicker-api.metafighter.com/api/v1/actions/skill/", {
        ...headers,
        "Content-Type": "application/json",
        "authorization": token
    }, false, JSON.stringify({skill_type}));
}

/*export async function startGame(token: string) {

    return await request("POST", "https://game-domain.blum.codes/api/v1/game/play", {
        ...headers,
        "authorization": token
    }, false);
}

export async function endGame(gameId: string, points: number, token: string) {
    return await request("POST", "https://game-domain.blum.codes/api/v1/game/claim", {
        ...headers,
        "Content-Type": "application/json",
        "authorization": token
    }, false, JSON.stringify({gameId, points}));
}*/

export function getDate(): string {
    return new Date().toISOString().split(".")[0];
}
