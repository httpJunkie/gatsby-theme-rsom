const fs = require('fs');

// 1. Makes sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'data';

  if(!fs.existsSync(contentPath)) {
    reporter.info(`creating ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};

// 2. Define Talks type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Talk implements Node @dontInfer {
      id: ID!
      title: String!
      location: String!
      talkDate: Date! @dateformat @proxy(from: "talk_date")
      url: String!
      slug: String!
    }
  `)
}

// 3. Define resolvers for any custom fields (slug)
exports.createResolvers = ({ createResolvers}, options) => {
  const basePath = options.basePath || '/';

  // SLUG NAMING CONVENTION: `localhost:8000/top-level-things/sub-thing-or-things/25`

  const slugify = str => {
    const slug = str
    .toLowerCase()
    // anything that is not a group (every occurance) of numbers and words replace with dash
    .replace(/[^a-z0-9]+/g, '-')
    // replace leading or trailing hyphens with nothing
    .replace(/(^-|-$)+/g, '');

    // return properly slashed slug
    return `/${basePath}/${slug}`
      .replace(/\/\/+/g, '/');
  }

  createResolvers({
    Talk: {
      slug: {
        resolve: source => slugify(source.title)
      }
    }
  });
}

// 4. Query for talks and create pages
// Is async because it's running a graphql query
exports.createPages = async ({ actions, graphql, reporter}, options) => {
  const basePath = options.basePath || '/';

  // create talks page
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/talks.js')
  });

  const result = await graphql(`
    query {
      allTalk(sort: {order: DESC, fields: talkDate}) {
        nodes {
          id
          location
          slug
          talkDate
          title
          url
        }
      }
    }
  `)

  if(result.errors) {
    reporter.panic('error loading talks', reporter.errors);
    return;
  }

  const talks = result.data.allTalk.nodes;

  // create talks page
  talks.forEach(talk => {
    const slug = talk.slug;

    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/talk.js'),
      context: {
        talkID: talk.id
      }
    });
  });
};