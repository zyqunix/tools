import * as main from "./index.js";
const API = "https://api-public.cs-prod.leetify.com/v3/profile?steam64_id=";
// bru
const ranks = {
    1: "Silver 1",
    2: "Silver 2",
    3: "Silver 3",
    4: "Silver 4",
    5: "Silver Elite",
    6: "Silver Elite Master",

    7: "Gold Nova 1",
    8: "Gold Nova 2",
    9: "Gold Nova 3",
    10: "Gold Nova Master",

    11: "Master Guardian 1",
    12: "Master Guardian 2",
    13: "Master Guardian Elite",
    14: "Distinguished Master Guardian",

    15: "Legendary Eagle",
    16: "Legendary Eagle Master",
    17: "Supreme Master First Class",
    18: "Global Elite"
}

export async function fetchLeetify(user) {
    const res = await fetch(`${API}${user}`);
    const data = await res.json();
    return data;
}

export async function populateLeetify(target) {
    const data = await fetchLeetify("76561199544979536");
    console.log(data);

    target.innerHTML = `
        <a href="https://steamcommunity.com/profiles/${data.steam64_id}"><div class="h2" style="margin-bottom: 8px;">${data.name}</div></a>
        <table style="margin:auto; text-align:left; width: 100%; border:2px solid var(--overlay0); border-radius: 8px">
            <tr>
                <th class="table-header" colspan="2">Ranks</th>
            </tr>
            <tr>
                <td>Leetify</td>
                <td>${data.ranks.leetify}</td>
            </tr>
            <tr>
                <td>Premier</td>
                <td>${data.ranks?.premier || "None"}</td>
            </tr>
            <tr>
                <td>Faceit</td>
                <td>${data.ranks.faceit || "None"}</td>
            </tr>
            <tr>
                <td>Faceit ELO</td>
                <td>${data.ranks.faceit_elo || "None"}</td>
            </tr>
            <tr>
                <td>Wingman</td>
                <td>${ranks[data.ranks.wingman] || "None"}</td>
            </tr>
            <tr>
                    <td>Competetive</td>
                    <td>${data.ranks.competitive.map(item => `<div>${item.map_name}: ${ranks[item.rank] || "Unranked"}</div>`).join('')}</td>
            </tr>
                <th class="table-header" colspan="2" style="border-top: 2px solid var(--overlay0)">Rating</th>
            </tr>
            <tr>
                <td>Aim</td>
                <td>${data.rating.aim.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Clutch</td>
                <td>${data.rating.clutch.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Opening</td>
                <td>${data.rating.opening.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Utility</td>
                <td>${data.rating.utility.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Opening</td>
                <td>${data.rating.opening.toFixed(2)}</td>
            </tr>
            <tr>
                <td>CT-Rating</td>
                <td>${data.rating.ct_leetify.toFixed(2)}</td>
            </tr>
            <tr>
                <td>T-Rating</td>
                <td>${data.rating.t_leetify.toFixed(2)}</td>
            </tr>


            <tr>
                <th class="table-header" colspan="2" style="border-top: 2px solid var(--overlay0)">Stats</th>
            </tr>
            <tr>
                <td>Win Rate</td>
                <td>${data.winrate.toFixed(2) * 100}%</td>
            </tr>
            <tr>
                <td>Total Matches</td>
                <td>${data.total_matches}</td>
            </tr>
            <tr>
                <td>Accuracy</td>
                <td>${data.stats.accuracy_enemy_spotted.toFixed(2)}%</td>
            </tr>
            <tr>
                <td>Spray Accuracy</td>
                <td>${data.stats.spray_accuracy.toFixed(2)}%</td>
            </tr>
            <tr>
                <td>Headshot Accuracy</td>
                <td>${data.stats.accuracy_head.toFixed(2)}%</td>
            </tr>
            <tr>
                <td>Counter-Strafing</td>
                <td>${data.stats.counter_strafing_good_shots_ratio.toFixed(2)}%</td>
            </tr>
            <tr>
                <td>Preaim</td>
                <td>${data.stats.preaim.toFixed(2)}°</td>
            </tr>
        </table>
        

        <br>
        <br>

        <div class="h3">Recent Matches</div>
        <br>
        <table style="margin:auto; text-align:left; width: 100%; border:2px solid var(--overlay0); border-radius: 8px"> 
            <tr class="table-header">
                <td>Map Name</td>
                <td>Rank</td>
                <td>Outcome</td>
            </tr>
            ${data.recent_matches.slice(0, 5).map(match => `
                <tr style="background-color: ${match.outcome === 'win' ? '#4dc49e' : match.outcome === 'loss' ? '#f77c60' : 'gray'}">
                    <td><a href="https://leetify.com/app/match-details/${match.id}" target="_blank">${match.map_name}</a></td>
                    <td>${ranks[match.rank] || "Unranked"}</td>
                    <td class="tooltip" data-tooltip="${match.score[0]}:${match.score[1]}">${main.capitalize(match.outcome)}</td>
                </tr>
            `).join('')}
        </table>
        <br>
        <details>
            <summary>Show all matches (${data.recent_matches.length})</summary>
            <table style="margin:auto; text-align:left; width:100%; border:2px solid var(--overlay0); border-radius:8px">
                <tr>
                    <td>Map Name</td>
                    <td>Rank</td>
                    <td>Outcome</td>
                </tr>
                ${data.recent_matches.map(match => `
                    <tr style="background-color: ${match.outcome === 'win' ? '#4dc49e' : match.outcome === 'loss' ? '#f77c60' : 'gray'}; backdrop-filter: opacity(0.3)">
                        <td><a href="https://leetify.com/app/match-details/${match.id}" target="_blank">${match.map_name}</a></td>
                        <td>${ranks[match.rank] || "Unranked"}</td>
                        <td class="tooltip" data-tooltip="${match.score[0]}:${match.score[1]}">${main.capitalize(match.outcome)}</td>
                    </tr>
                `).join('')}
            </table>
        </details>
    `
}
