import * as core from '@actions/core'
import * as github from '@actions/github'

const IS_SOURCE_BRANCH_AHEAD = 'is-source-branch-ahead'

async function run() {
  const token = core.getInput('repo-token')
  const sourceBranch = core.getInput('source-branch')
  const targetBranch = core.getInput('target-branch')

  const client = github.getOctokit(token)

  try {
    core.setOutput(IS_SOURCE_BRANCH_AHEAD, 'false');
    const { data: pulls } = await client.pulls.list({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      state: 'open',
    })
    const masterToDevelopPr = pulls.find(
      ({ head, base }) => head.ref === sourceBranch && base.ref === targetBranch
    )
    if (masterToDevelopPr) {
      // PR from {{ sourceBranch }} to {{ targetBranch }} already exists
      // test
      return
    }
    // check if {{ sourceBranch }} is ahead {{ targetBranch }}
    const { data } = await client.repos.compareCommits({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      base: targetBranch,
      head: sourceBranch,
    })
    if (data.ahead_by !== 0) {
      core.setOutput(IS_SOURCE_BRANCH_AHEAD, 'true');
      return
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
