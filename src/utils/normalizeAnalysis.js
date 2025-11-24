export function normalizeAnalysis(data) {
  return {
    is_resume: Boolean(data?.is_resume), // ALWAYS true/false
    reason: data?.reason || "",

    atsScore: Number(data?.atsScore || 0), // no undefined

    skills: data?.skills ? { ...data.skills } : {},

    roles: Array.isArray(data?.roles)
      ? data.roles.map((r) => ({
          role: r?.role || "",
          score: Number(r?.score || 0),
          evidence: r?.evidence || "",
        }))
      : [],

    projects: Array.isArray(data?.projects)
      ? data.projects.map((p) => ({
          original: p?.original || "",
          enhanced: Array.isArray(p?.enhanced) ? [...p.enhanced] : [],
        }))
      : [],

    summary: data?.summary || "",
    suggestions: Array.isArray(data?.suggestions) ? [...data.suggestions] : [],

    createdAt: new Date().toISOString(),
  };
}
