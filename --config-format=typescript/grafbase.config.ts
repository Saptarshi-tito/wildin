import { g, graph, config } from '@grafbase/sdk'

// const g = graph.Standalone()
// @ts-ignore
// types are generated with the `type` method,
// followed by the name and fields.
const User = g.model('User', {
  name: g.string(),
  email: g.string(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
  projects: g.relation(() => Project).list().optional(),
})

  const Project = g.model('Project', {
    title: g.string(),
    description: g.string(), 
    image: g.url(),
    liveSiteUrl: g.url(), 
    githubUrl: g.url(), 
    category: g.string(),
    createdBy: g.relation(() => User),
  }).auth((rules) => {
    rules.public().read()
    rules.private().create().delete().update()
  })


// finally we export the default config
export default config({
  schema: g
})