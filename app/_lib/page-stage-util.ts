import PAGE_STAGES from "../page_stages.json"
import { cache } from "react"

export type PageStage = keyof typeof PAGE_STAGES | "default"

/**
 * Determine page stage at the request time
 */
function _determinePageStage() {
  const request_time = new Date()
  // If we traverse the stages reverse-chronologically, then the first stage that is <= request_time
  // will be the current stage at request time
  const reverseChronologicalStages = Object.entries(PAGE_STAGES)
    .map(([stage, stageDate]) => ({ stage: stage, date: new Date(stageDate) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
  const currentStageAtRequestTime = reverseChronologicalStages.find(stage => stage.date.getTime() <= request_time.getTime())?.stage || "default"

  return validatePageStage(currentStageAtRequestTime)
}

/**
 * Determine page stage at request_time
 * Cached using react's 'cache'
 */
export const determinePageStage = cache(_determinePageStage)

/**
 * Validate that pageStage value is either "default" or a provided value in 'page_stages.json'
 * Return pageStage as is if yes. Throw error if pageStage is unknown
 */
export function validatePageStage(pageStage: string | undefined): keyof typeof PAGE_STAGES | "default" {
  if (pageStage && (pageStage in PAGE_STAGES || pageStage === "default")) {
    return pageStage as keyof typeof PAGE_STAGES | "default"
  }
  throw Error(`Unknown page stage: ${pageStage}`)
}
