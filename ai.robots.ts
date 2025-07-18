import { downloadRelease } from "@terascope/fetch-github-release";

// welcome to the most jury-rigged solution to a lack of windows support. also included as a package script which *hopefully* will work on vercel despite not working on windows
const releaseInfo = downloadRelease('ai-robots-txt','ai.robots.txt','lib/releaseDownloads/',(release) => (true || release),(asset) => (asset.name == 'robots.txt'));

export default releaseInfo;
