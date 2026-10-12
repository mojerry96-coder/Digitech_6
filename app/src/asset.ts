/** Resolve a public asset against the deployment base, so builds work from any folder (or an LMS package). */
export const A = (p: string) => import.meta.env.BASE_URL + p;
