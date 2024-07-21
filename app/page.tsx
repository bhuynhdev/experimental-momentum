import { PageStageSwitcher } from "./_components/PageStageSwitcher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PageStageSwitcher
        default={<div>Announcement here</div>}
        earlybirdTicket={<div>Earlybird ticket available</div>}
        event={<div>Main event NOW!</div>}
        postEvent={<div>Thank you for participating!</div>}
      />
    </main>
  );
}
