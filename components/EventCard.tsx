import Link from "next/link";
import Image from "next/image";

interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({title, image, slug, location, date, time}: Props) => {
    return (
        <Link href={"/events/"+slug} id="event-card">
            <Image src={image} alt={title} width={410} height={300} className="poster"/>

            <div className="flex flex-col space-y-2 mt-4">
                <p className="title text-xl font-bold">
                    {title}
                </p>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Image src="/icons/calendar.svg" alt="calendar" width={16} height={16} />
                    <span>{date}</span>
                    <span className="mx-2">|</span>
                    <Image src="/icons/clock.svg" alt="clock" width={16} height={16} />
                    <span>{time}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Image src="/icons/pin.svg" alt="location" width={16} height={16} />
                    <span>{location}</span>
                </div>
            </div>
        </Link>
    )
}
export default EventCard
