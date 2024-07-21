import { headers } from 'next/headers'
import PAGE_STAGES from "../page_stages.json"
import { validatePageStage } from '../_lib/page-stage-util';

type PageStages = keyof typeof PAGE_STAGES;

interface PageStageSwitcherProps extends Partial<Record<PageStages, JSX.Element>> {
  default: JSX.Element
}

export function PageStageSwitcher(props: PageStageSwitcherProps) {
  const headersList = headers()
  let pageStageFromHeader = headersList.get('x-page-stage');
  const pageStage = validatePageStage(pageStageFromHeader);
  return <div>
    Page stage: {pageStage}
    {props[pageStage]}
  </div>
}
