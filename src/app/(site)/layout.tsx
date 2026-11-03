import { siteConfig } from "@/config/site";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ReviewBar } from "@/components/ui/ReviewNotesToggle";
import { newsreader } from "../fonts";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className={`${newsreader.variable} flex flex-1 flex-col`}>
      {siteConfig.reviewMode ? <ReviewBar /> : null}
      <SiteChrome>{children}</SiteChrome>
    </div>
  );
}
