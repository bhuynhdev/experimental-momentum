import PAGE_STAGES from "../page_stages.json"

/**
 * Determine page stage at the request_time
 */
export function determinePageStage(request_time: Date) {
  // If we traverse the stages reverse-chronologically, then the first stage that is <= request_time
  // will be the current stage at request time
  const reverseChronologicalStages = Object.entries(PAGE_STAGES)
    .map(([stage, stageDate]) => ({ stage: stage, date: new Date(stageDate) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
  const current_stage_at_request_time = reverseChronologicalStages.find(stage => stage.date.getTime() <= request_time.getTime())

  return current_stage_at_request_time
}

/**
 * Validate that pageStage value is either "default" or a provided value in 'page_stages.json'
 * Return pageStage as is if yes. Throw error if pageStage is unknown
 */
export function validatePageStage(pageStage: string | null): keyof typeof PAGE_STAGES | "default" {
  if (pageStage && (pageStage in PAGE_STAGES || pageStage === "default")) {
    return pageStage as keyof typeof PAGE_STAGES | "default"
  }
  throw Error(`Unknown page stage: ${pageStage}`)
}
