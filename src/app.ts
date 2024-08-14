import {userInfo, click, skill} from "./gamety";
import {generateRandomNumber, sleep} from "./utils";

(async () => {
    const minClicks = 10;
    const maxClicks = 16;

    //multiple accounts
    const authTokens = [
        "your token 1",
        "your token 2"
    ];

    let jobs = [];
    for(const authToken of authTokens) {
        jobs.push(job(authToken));
    }

    // @ts-ignore
    Promise.allSettled(jobs);

    async function job(authToken: string) {
        try {
            let ui = await userInfo(authToken);

            if(!ui) {
                console.log("Update token");
                return;
            }

            if(ui.data.stat.energy_current < 1) {
                console.log("You don't have enough energy to fight");
                return;
            }
            let energy = ui.data.stat.energy_current;

            //use mid-boost while fresh
            await skill(authToken, "mid");

            let hardUsed = false;

            while(energy > 1) {
                let clicks = generateRandomNumber(minClicks, maxClicks);

                if(energy < clicks) {
                    clicks = parseInt(energy, 10);
                }
                let clickResponse = await click(authToken, clicks);

                /*if(!clickResponse.success) {
                    console.log(JSON.stringify(clickResponse, null, 4));
                    console.log("Update token");
                    return;
                }*/

                energy = clickResponse.data.energy_current;
                await sleep(3);
                if(energy < 1) {
                    if(!hardUsed) {
                        //use hard skill once
                        let hard = await skill(authToken, "hard");
                        hardUsed = true;
                        if(!hard.success) {
                            await sleep(60);
                        }
                    }
                    else {
                        console.log("Low energy, charging");
                        await sleep(60);
                    }
                    let ui = await userInfo(authToken);
                    energy = ui.data.stat.energy_current;
                }
            }

            console.log("Finished");
        } catch (e: any) {
            console.log(e);
            console.log("Update token");
        }
    }
})();
