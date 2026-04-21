import { Pool } from '@neondatabase/serverless';
import { Kysely, PostgresDialect } from 'kysely';
import { DB } from "@/kysely-types.ts";

export async function getEpisodeList(sort_order: 'asc' | 'desc') {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const response = await db
        .selectFrom('episodes')
        .innerJoin('seasons', 'episodes.season_id', 'seasons.id')
        .select(['episodes.id as id', 'title', 'slug', 'ep_num', 'season_num', 'season_ep_num'])
        .orderBy('ep_num',sort_order)
        .execute();

    pool.end();

    return response;
}

export async function getEpisode(slug: string) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const episodeResponse = await db
        .selectFrom('episodes')
        .innerJoin('episode_covers', 'episodes.cover_id', 'episode_covers.id')
        .innerJoin('seasons', 'episodes.season_id', 'seasons.id')
        .select(['episodes.id as id', 'ep_num', 'season_num', 'episodes.season_ep_num', 'title', 'slug', 'link_spotify', 'link_apple', 'link_amazon', 'description', 'triggers', 'episode_covers.filename as cover_filename', 'episode_covers.alt_text as cover_alt_text', 'episode_covers.width as cover_width', 'episode_covers.height as cover_height', 'seasons.cover_filename as season_cover_filename', 'seasons.cover_alt_text as season_cover_alt_text'])
        .where('slug', '=', slug)
        .execute();
    
    const transcriptResponse = await db
        .selectFrom('episodes')
        .innerJoin('transcripts', 'transcripts.ep_id', 'episodes.id')
        .select(['transcripts.line_num as line_num', 'transcripts.character as character', 'transcripts.line as line'])
        .where('slug','=',slug)
        .orderBy('line_num')
        .execute();
    
    const creditsResponse = await db
        .selectFrom('episodes')
        .innerJoin('credits', 'credits.ep_id', 'episodes.id')
        .innerJoin('team', 'credits.team_id', 'team.id')
        .select(['credits.id as id', 'full_name as name', 'superrole', 'role'])
        .where('slug', '=', slug)
        .execute();
    
    // compile data from both queries into one object for use on page
    const compiledData = {
        ...episodeResponse[0],
        credits: creditsResponse,
        transcript: transcriptResponse
    }

    pool.end();

    return compiledData;
}

export async function getLatestEp(mode: 'episodes' | 'announcements' | 'all') {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const MODE = mode == 'episodes' ? ' not' : '';

    const response = await db
        .selectFrom('episodes')
        .select(['id', 'slug'])
        .$if(mode == "announcements", (qb) => qb.select(['description']))
        .$if(mode != "all", (qb) => qb.where('season_ep_num',`is${MODE}`,null))
        .orderBy('id', 'desc')
        .limit(1)
        .execute();

    pool.end();

    return response[0];
}

export async function getNearbyEp(column: string, num: number) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const response = await db
        .selectFrom('episodes')
        .select(['id', 'slug'])
        .$if(column == "season", (qb) => qb.where('season_ep_num', '=', num))
        .$if(column == "ep", (qb) => qb.where('ep_num', '=', num))
        .execute();

    pool.end();

    return response[0];
}

export async function getTeamList() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const infoResponse = await db
        .selectFrom('team')
        .select(['id', 'full_name as name', 'pronouns', 'headshot_filename', 'headshot_width', 'headshot_height', 'bio', 'socials', 'projects', 'quote'])
        .execute();
    
    const roleResponse = await db
        .selectFrom('credits')
        .select(['team_id', 'superrole', 'role'])
        .where('credits.role','not like','%self')
        .distinct()
        .execute();

    const compiledData = infoResponse.map((member) => {
        const memberJobs = roleResponse.filter((entry) => (entry.team_id === member.id) && (entry.superrole == 'Crew')).map((entry) => entry.role);
        const memberRoles = roleResponse.filter((entry) => (entry.team_id === member.id) && (entry.superrole == 'Cast')).map((entry) => entry.role);

        if (memberRoles.length != 0) {
            memberJobs.push('Voice Actor');
        }

        return {
            ...member,
            jobs: memberJobs,
            roles: memberRoles
        }
    });

    pool.end();
    
    return compiledData;
}

export async function getShowLinks(type?: string) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const response = await db
        .selectFrom('show_links')
        .selectAll()
        .$if(Boolean(type), (qb) => qb.where('type', '=', String(type)))
        .orderBy('id', 'asc')
        .execute();
    
    pool.end();

    return response;
}

export async function getConceptArt(count?: number, type?: string) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const countResponse = await db
        .selectFrom("concept_art")
        .select(db.fn.countAll<number>().as("count"))
        .$if(Boolean(type), (qb) => qb.where('type', '=', String(type)))
        .execute();

    const rowCount = count != undefined ? countResponse[0].count - count : countResponse[0].count;

    const response = await db
        .selectFrom('concept_art')
        .selectAll()
        .$if(Boolean(type), (qb) => qb.where('type', '=', String(type)))
        .offset(Math.floor(Math.random() * rowCount))
        .$if(Boolean(count), (qb) => qb.limit(Number(count)))
        .orderBy('id', 'asc')
        .execute();
    
    pool.end();

    return response;
}

export async function getNotFoundArt() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const rangeResponse = await db
        .selectFrom('notfound_art')
        .select((eb) => eb.fn.max('id').as('max_id'))
        .execute();
    
    const randomId = Math.floor((Math.random() * rangeResponse[0].max_id) + 1);

    const response = await db
        .selectFrom('notfound_art')
        .selectAll()
        .where('id','=',randomId)
        .execute();

    pool.end();

    return response;
}

export async function getTranscript(ep_num: number) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const response = await db
        .selectFrom('transcripts')
        .selectAll()
        .where('ep_id','=',ep_num)
        .orderBy('line_num')
        .execute();
    
    pool.end();

    return response;
}
