import { neon } from '@neondatabase/serverless';

export async function getEpisodeList() {
    const sql = neon(process.env.DB_URL);
    const response = await sql`
    SELECT episodes.id as id, title, slug, ep_num, season_num
    FROM episodes
    JOIN seasons ON season_id = seasons.id`;
    return response;
}

export async function getEpisode(slug: string) {
    const sql = neon(process.env.DB_URL);
    
    const [episodeResponse, creditsResponse] = await sql.transaction([
        sql`
        SELECT episodes.id as id, ep_num, season_num, season_ep_num, title, slug, link_spotify, link_apple, link_amazon, description, triggers, transcript_filename, episode_covers.filename as cover_filename, episode_covers.alt_text as cover_alt_text, seasons.cover_filename as season_cover_filename, seasons.cover_alt_text as season_cover_alt_text
        FROM episodes
        JOIN episode_covers ON episode_covers.id = episodes.cover_id
        JOIN seasons ON season_id = seasons.id
        WHERE slug=${slug}`, // get episodes with joins for foreign keys
        sql`
        SELECT full_name AS name, superrole, role
        FROM episodes
        JOIN credits ON ep_id = episodes.id
        JOIN team ON team_id = team.id
        WHERE slug=${slug}`// get list of all credits with names and roles
    ]);

    // compile data from both queries into one object for use on page
    // yes it looks awful, but this was the last-resort fix for Typescript throwing errors about combining two generic Records
    // will revamp using Kysely later
    const compiledData = {
        id: episodeResponse[0].id,
        ep_num: episodeResponse[0].ep_num,
        season_num: episodeResponse[0].season_num,
        season_ep_num: episodeResponse[0].season_ep_num,
        title: episodeResponse[0].title,
        slug: episodeResponse[0].slug,
        link_spotify: episodeResponse[0].link_spotify,
        link_apple: episodeResponse[0].link_apple,
        link_amazon: episodeResponse[0].link_amazon,
        description: episodeResponse[0].description,
        triggers: episodeResponse[0].triggers,
        transcript_filename: episodeResponse[0].transcript_filename,
        cover_filename: episodeResponse[0].cover_filename,
        cover_alt_text: episodeResponse[0].cover_alt_text,
        season_cover_filename: episodeResponse[0].season_cover_filename,
        season_cover_alt_text: episodeResponse[0].season_cover_alt_text,
        credits: creditsResponse
    }

    return compiledData;
}

export async function getLatestEp() {
    const sql = neon(process.env.DB_URL);
    const response = await sql`
    SELECT id, slug
    FROM episodes
    WHERE id = (
        SELECT MAX(id)
        FROM episodes
    )`;
    return response[0];
}

export async function getTeamList() {
    const sql = neon(process.env.DB_URL);
    const [infoResponse, roleResponse] = await sql.transaction([
        sql`
        SELECT id, full_name as name, pronouns, headshot_filename, bio, socials, projects, quote 
        FROM team`,
        sql`
        SELECT DISTINCT team_id, role
        FROM credits`
    ]);

    const compiledData = infoResponse.map((member) => {
        const memberRoles = roleResponse.filter((entry) => entry.team_id === member.id).map((entry) => entry.role);
        return {
            ...member,
            roles: memberRoles
        }
    });
    
    return compiledData;
}

export async function getShowLinks(type?: string) {
    const sql = neon(process.env.DB_URL);
    let response;
    
    if (type) {
        response = await sql`
        SELECT *
        FROM show_links
        WHERE type = ${type}
        ORDER BY id ASC`;
    }else {
        response = await sql`
        SELECT *
        FROM show_links
        ORDER BY id ASC`;
    }

    return response;
}

export async function getConceptArt(type?: string) {
    const sql = neon(process.env.DB_URL);
    let response;
    
    if (type) {
        response = await sql`
        SELECT *
        FROM concept_art
        WHERE type = ${type}
        ORDER BY id ASC`;
    }else {
        response = await sql`
        SELECT *
        FROM concept_art
        ORDER BY id ASC`;
    }

    return response;
}
