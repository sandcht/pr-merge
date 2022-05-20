import * as core from '@actions/core'
import * as github from '@actions/github'

// most @actions toolkit packages have async methods
const MileStone = github.context.payload.pull_request.milestone.title
let CHERRY_PICK_BRANCH_LIST
core.info(`MileStone = ${MileStone}`) 
const ReleaseConfiguration = [
  {
    nom: "PALLADIUM",
    branch: "release/palladium",
    tag: 'xxxx',
    isActive: false
  },
  {
    nom: "FLUOR",
    branch: "release/fluor",
    tag: 'EN COURS - xxxx',
    isActive: false
  },
  {
    nom: "MAIN",
    branch: "main",
    tag: 'EN COURS - 4.argon-beta.3',
    isActive: false
  },
  ,{
    nom: "ARGON",
    branch: "develop",
    tag: 'EN COURS - 4.argon-beta.3',
    isActive: true
  },
  {
    nom: "PHOSPHORE",
    branch: "release/phosphore",
    tag: 'EN COURS - 4.argon-beta.3',
    isActive: false
  },
]

async function run() {

  try {
    const merge_commit_number = github.context.payload.pull_request.merge_commit_sha
    core.setOutput('merge_commit_number', merge_commit_number)
    core.info(`merge_commit_number = ${merge_commit_number}`)  
    await cherry_pick_base_branch (ReleaseConfiguration,MileStone)
    core.setOutput('CHERRY_PICK_BRANCH_LIST', CHERRY_PICK_BRANCH_LIST)

  } catch (error) {
    core.setFailed(error.message);
  }
}
async function cherry_pick_base_branch (ReleaseConfiguration,MileStone){
  const index_milestone = ReleaseConfiguration.findIndex((config)=> config.nom==MileStone.toUpperCase())
  core.info(`index_milestone  = ${index_milestone }`)
  const index_Sprint_Actif = ReleaseConfiguration.findIndex((config)=> config.isActive==true)
  core.info(`index_Sprint_Actif= ${index_Sprint_Actif  }`)
  CHERRY_PICK_BRANCH_LIST=ReleaseConfiguration.slice(index_milestone,index_Sprint_Actif).map((SubReleaseConfiguration)=>SubReleaseConfiguration.branch)
  core.info(JSON.stringify(CHERRY_PICK_BRANCH_LIST))

}
run();
