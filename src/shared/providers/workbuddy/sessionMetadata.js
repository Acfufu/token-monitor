'use strict';

const path = require('node:path');
const { createProjectsResolver } = require('../codebuddy/sessionMetadata');

// WorkBuddy writes the same transcript family as CodeBuddy Code — same record
// types, the same ai-title/custom-title/status fields, usage on the response's
// messageId — under its own projects roots. The editions keep separate homes
// (CN WorkBuddy in `~/.workbuddy`, the international WorkBuddy AI in
// `~/.workbuddy-ai`), but the CN list keeps the AI root as a 5.5-era fallback:
// that build briefly lived there, so old CN sessions still resolve with the
// first hit winning. The AI client resolves from its own home only.
//
// There is deliberately no extension-store fallback here: the CodeBuddy
// reader's fallback walks the VS Code extension's own Data tree, which is not
// where WorkBuddy keeps anything.
function projectsRoots({ home, client }) {
  if (client === 'workbuddy-ai') {
    return [path.join(home, '.workbuddy-ai', 'projects')];
  }
  return [
    path.join(home, '.workbuddy', 'projects'),
    path.join(home, '.workbuddy-ai', 'projects')
  ];
}

module.exports = {
  resolveSessionMetadata: createProjectsResolver(projectsRoots)
};
