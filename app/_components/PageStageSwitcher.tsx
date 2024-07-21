import PAGE_STAGES from "../page_stages.json"
import { determinePageStage } from '../_lib/page-stage-util';

type PageStages = keyof typeof PAGE_STAGES;

interface PageStageSwitcherProps extends Partial<Record<PageStages, JSX.Element>> {
  default: JSX.Element
}

export function PageStageSwitcher(props: PageStageSwitcherProps) {
  const pageStage = determinePageStage();
  return <div>
    Page stage: {pageStage}
    {props[pageStage] || props.default}
  </div>
}
