import * as core from '@actions/core'
import * as github from '@actions/github'

// most @actions toolkit packages have async methods
async function run() {
  try {
    const merge_commit_number = github.context.payload.pull_request.merge_commit_sha
    core.setOutput('merge_commit_number', merge_commit_number)
    core.info(`merge_commit_number == ${merge_commit_number}`)
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
