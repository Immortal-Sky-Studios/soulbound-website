import { neon } from '@neondatabase/serverless';

export async function getEpisodeList() {
    const sql = neon(process.env.DB_URL);
    const response = await sql`
    SELECT title, slug, ep_num, season_num
    FROM episodes
    JOIN seasons ON season_id = seasons.id`;
    return response;
}

export async function getEpisode(slug: string) {
    const sql = neon(process.env.DB_URL);
    // get episodes with joins for foreign keys
    const episodeResponse = await sql`
    SELECT ep_num, season_num, season_ep_num, title, slug, link_spotify, link_apple, link_amazon, description, triggers, transcript_filename, episode_covers.filename as cover_filename, episode_covers.alt_text as cover_alt_text, seasons.cover_filename as season_cover_filename, seasons.cover_alt_text as season_cover_alt_text
    FROM episodes
    JOIN episode_covers ON episode_covers.id = episodes.cover_id
    JOIN seasons ON season_id = seasons.id
    WHERE slug=${slug}`;

    // get list of all credits with names and roles
    const creditResponse = await sql`
    SELECT full_name AS name, superrole, role
    FROM episodes
    JOIN credits ON ep_id = episodes.id
    JOIN team ON team_id = team.id
    WHERE slug=${slug}`;

    // compile data from both queries into one object for use on page
    const compiledData = {
        ...episodeResponse[0],
        credits: creditResponse
    }

    return compiledData;
}

export async function getLatestEp() {
    const sql = neon(process.env.DB_URL);
    const response = await sql`
    SELECT slug
    FROM episodes
    WHERE id = (
        SELECT MAX(id)
        FROM episodes
    )`;
    return response[0];
}

export async function getTeamList() {
    const sql = neon(process.env.DB_URL);
    const nameResponse = await sql`
    SELECT id, full_name
    FROM team`;

    const roleResponse = await sql`
    SELECT DISTINCT team_id, role
    FROM credits`;

    const compiledData = nameResponse.map((member) => {
        const memberRoles = roleResponse.filter((entry) => entry.teawm_id === member.id).map((entry) => entry.role);
        return {
            name: member.full_name,
            roles: memberRoles
        }
    });
    
    return compiledData;
}
