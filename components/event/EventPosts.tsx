import { graphqlClient } from "@/lib/graphql";
import { EVENTS_META_LIST_QUERY } from '@/lib/queries/events';
import Link from 'next/link';


type EventCategory = {
    name: string;
    slug: string;
    categoryColor: string;
};

type ImageGalleryItem = {
    caption: string;
    imageUrl: string;
};

type Event = {
    id: string;
    title: string;
    slug: string;
    eventDate: string;
    eventPaymentType?: string;
    eventCategories: {
        nodes: EventCategory[];
    };
    imageGallery: ImageGalleryItem[];
};

async function getEvents() {
    const data = await graphqlClient.request(EVENTS_META_LIST_QUERY, {
        first: 10,
    });

    return data.events.nodes as Event[];
}

export const revalidate = 60;

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <section className="w-full bg-ghost-white">
            <div className="mx-auto xl:w-4/5 px-5 pt-25 pb-20 relative">
                <h1 className="text-3xl font-bold">Events</h1>
                <div className="grid gap-6 md:grid-cols-3">
                    {events.map((event) => (
                    <article key={event.id} className="flex flex-col p-5 space-y-3 rounded-2xl shadow-[0_9px_10px_1px_rgba(0,0,0,0.14)]">
                        {event.imageGallery?.[0] && (
                            <div className="h-48 w-full overflow-hidden rounded">
                            <img
                                src={event.imageGallery[0].imageUrl}
                                alt={event.imageGallery[0].caption ?? event.title}
                                className="h-full w-full object-cover"
                            />
                            </div>
                        )}
                        <div className="space-y-2">
                            <div className="mt-1 flex items-center gap-2">
                                <span
                                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                        event.eventPaymentType === 'paid'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-green-100 text-green-700'
                                    }`}
                                >
                                    {event.eventPaymentType === 'paid' ? 'Paid Event' : 'Free Event'}
                                </span>
                            </div>                        
                            <h4 className="text-2xl font-semibold line-clamp-2">
                                {event.title}
                            </h4>

                            {event.eventDate && (
                                <div className="text-sm text-gray-500">
                                    Event Date:{' '}
                                    {new Date(event.eventDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </div>
                            )}

                            {event.eventCategories?.nodes?.length > 0 && (
                                <ul className="flex gap-2 mt-2 mb-4">
                                    {event.eventCategories.nodes.map((cat: any) => (
                                        <li
                                            key={cat.slug}
                                            className="text-xs !text-white px-3 py-1 rounded-full"
                                            style={{
                                                backgroundColor: cat.categoryColor || "#6b7280",
                                            }}
                                        >
                                            {cat.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <Link href={`/event/${event.slug}`} className="inline-block text-sm font-semibold text-[#F85E00] hover:underline">Learn more →</Link>

                    </article>

                    ))}
                </div>
            </div>
        </section>
    );
}