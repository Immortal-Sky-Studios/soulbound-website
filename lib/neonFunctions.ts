import { Pool } from '@neondatabase/serverless';
import { Kysely, PostgresDialect } from 'kysely';
import { DB } from "@/kysely-types.ts";

export async function getEpisodeList() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const response = await db
        .selectFrom('episodes')
        .innerJoin('seasons', 'episodes.season_id', 'seasons.id')
        .select(['episodes.id as id', 'title', 'slug', 'ep_num', 'season_num'])
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
        .select(['episodes.id as id', 'ep_num', 'season_num', 'season_ep_num', 'title', 'slug', 'link_spotify', 'link_apple', 'link_amazon', 'description', 'triggers', 'transcript_filename', 'episode_covers.filename as cover_filename', 'episode_covers.alt_text as cover_alt_text', 'seasons.cover_filename as season_cover_filename', 'seasons.cover_alt_text as season_cover_alt_text'])
        .where('slug', '=', slug)
        .execute();
    
    const creditsResponse = await db
        .selectFrom('episodes')
        .innerJoin('credits', 'credits.ep_id', 'episodes.id')
        .innerJoin('team', 'credits.team_id', 'team.id')
        .select(['full_name as name', 'superrole', 'role'])
        .where('slug', '=', slug)
        .execute();
    
    // compile data from both queries into one object for use on page
    const compiledData = {
        ...episodeResponse[0],
        credits: creditsResponse
    }

    pool.end();

    return compiledData;
}

export async function getLatestEp() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const response = await db
        .selectFrom('episodes')
        .select(['id', 'slug'])
        .where('id', '=', ({selectFrom}) => (selectFrom('episodes').select((eb) => eb.fn.max('id').as('max_id'))))
        .execute();

    pool.end();

    return response[0];
}

export async function getTeamList() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const infoResponse = await db
        .selectFrom('team')
        .select(['id', 'full_name as name', 'pronouns', 'headshot_filename', 'bio', 'socials', 'projects', 'quote'])
        .execute();
    
    const roleResponse = await db
        .selectFrom('credits')
        .select(['team_id', 'role'])
        .distinct()
        .execute();

    const compiledData = infoResponse.map((member) => {
        const memberRoles = roleResponse.filter((entry) => entry.team_id === member.id).map((entry) => entry.role);
        return {
            ...member,
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

export async function getConceptArt(type?: string) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });

    const response = await db
        .selectFrom('concept_art')
        .selectAll()
        .$if(Boolean(type), (qb) => qb.where('type', '=', String(type)))
        .orderBy('id', 'asc')
        .execute();
    
    pool.end();

    return response;
}
