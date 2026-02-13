import { graphqlClient } from '@/lib/graphql';
import { EVENT_BY_SLUG_QUERY } from '@/lib/queries/event';
import { notFound } from 'next/navigation';
import EventContentToggle from '@/components/event/EventContentToggle';

export const revalidate = 60;

async function getEvent(slug: string) {
    const data = await graphqlClient.request(EVENT_BY_SLUG_QUERY, { slug });
    return data.event;
}

export default async function EventPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    if (!slug) notFound();

    const event = await getEvent(slug);

    if (!event) notFound();

    const formatTo12Hour = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);

        const date = new Date();
        date.setHours(hours, minutes);

        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div className="w-full bg-ghost-white">
            <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 space-y-10">

                <header className="space-y-3 mb-5">
                    <h1 className="text-3xl sm:text-4xl font-bold">{event.eventName ?? event.title}</h1>

                    {event.eventCategories?.nodes?.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
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
                </header>

                {event.imageGallery?.[0] && (
                    <div className="w-full h-72 sm:h-96 overflow-hidden rounded-xl">
                        <img
                            src={event.imageGallery[0].imageUrl}
                            alt={event.imageGallery[0].caption ?? event.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Event Overview</h2>

                    {event.eventSummary && (
                        <p>{event.eventSummary}</p>
                    )}

                    <EventContentToggle content={event.content} />
                </section>

                <section className="space-y-6">
                    <h2 className="text-xl font-semibold">Event Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        {event.eventDate && (
                            <div>
                                <span className="font-medium">Event Date</span>
                                <p>
                                    {new Date(event.eventDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        )}                        
                        {event.eventStartTime && (
                            <div>
                                <span className="font-medium">Time</span>
                                <p>
                                    {formatTo12Hour(event.eventStartTime)}
                                    {event.eventEndTime && ` – ${formatTo12Hour(event.eventEndTime)}`}
                                </p>
                            </div>
                        )}

                        {event.eventMode && (
                            <div>
                                <span className="font-medium">Mode</span>
                                <p className="capitalize">{event.eventMode}</p>
                            </div>
                        )}

                        {event.eventPlace && (
                            <div>
                                <span className="font-medium">Location</span>
                                <p>{event.eventPlace}</p>
                            </div>
                        )}

                        {event.eventOnlineUrl && (
                            <div>
                                <span className="font-medium">Online Link</span>
                                <a
                                    href={event.eventOnlineUrl}
                                    target="_blank"
                                    className="text-pink-600 underline break-all"
                                >
                                    Join Event
                                </a>
                            </div>
                        )}

                        {event.eventHost && (
                            <div>
                                <span className="font-medium">Host</span>
                                <p>{event.eventHost}</p>
                            </div>
                        )}

                        {event.eventPaymentType && (
                            <div>
                                <span className="font-medium">Admission</span>
                                <p>
                                    {event.eventPaymentType === 'paid'
                                        ? `Paid ${event.eventPrice ? `– ${event.eventPrice}` : ''}`
                                        : 'Free'}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {event.imageGallery?.length > 1 && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold">Gallery</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {event.imageGallery.map((img: any, idx: number) => (
                                <img
                                    key={idx}
                                    src={img.imageUrl}
                                    alt={img.caption ?? event.title}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </section>
                )}

                {event.eventFaq?.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            {event.eventFaq.map((faq: any, idx: number) => (
                                <div key={idx}>
                                    <p className="font-medium">{faq.question}</p>
                                    <p className="text-sm text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </article>
        </div>
    );
}