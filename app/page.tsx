import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model"; // import IEvent

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const Page = async () => {
    const response = await fetch(""+BASE_URL+"/api/events");
    const { events }: { events: IEvent[] } = await response.json();

    return (
        <section>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-center">
                    The Hub for Every Dev <br />
                    Event You Can&apos;t Miss
                </h1>

                <p className="text-center mt-5">
                    Hackathons, Meetups, Conferences, All in One Place.
                </p>

                <ExploreBtn />
            </div>

            <div className="flex flex-col justify-start items-start mt-20 space-y-7">
                <h3>Featured Events</h3>

                <div className="grid grid-cols-4 space-y-2 events">
                    {events && events.length > 0 && events.map((event: IEvent) => (
                        <EventCard key={event.title} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Page;