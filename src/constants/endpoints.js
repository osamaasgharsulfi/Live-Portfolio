const BASE = process.env.PUBLIC_URL;

const endpoints = {
  navbar: `${BASE}/profile/navbar.json`,
  routes: `${BASE}/profile/routes.json`,
  home: `${BASE}/profile/home.json`,
  social: `${BASE}/profile/social.json`,
  about: `${BASE}/profile/about.json`,
  skills: `${BASE}/profile/skills.json`,
  education: `${BASE}/profile/education.json`,
  experiences: `${BASE}/profile/experiences.json`,
  projects: `${BASE}/profile/projects.json`,
};

export default endpoints;