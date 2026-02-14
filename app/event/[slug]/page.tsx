import { graphqlClient } from '@/lib/graphql';
import { EVENT_BY_SLUG_QUERY } from '@/lib/queries/event';
import { notFound } from 'next/navigation';
import EventContentToggle from '@/components/event/EventContentToggle';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

export const revalidate = 0;

async function getEvent(slug: string) {
    const data = await graphqlClient.request(EVENT_BY_SLUG_QUERY, { slug });
    return data.event;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    
    if (!slug) {
        return {
            title: 'Event Not Found',
            description: 'The requested event could not be found.',
        };
    }

    const event = await getEvent(slug);

    if (!event) {
        return {
            title: 'Event Not Found',
            description: 'The requested event could not be found.',
        };
    }

    const title = event.eventSeoTitle || event.eventName || event.title || 'Event';
    const description = event.eventSeoDescription || event.eventSummary || event.content?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Join us for this exciting event!';
    const image = event.featuredImage?.node?.sourceUrl;
    const imageAlt = event.featuredImage?.node?.altText || title;
    const imageWidth = event.featuredImage?.node?.mediaDetails?.width;
    const imageHeight = event.featuredImage?.node?.mediaDetails?.height;

    // Get the base URL for og:url
    const headersList = await headers();
    const host = headersList.get('host') || 'fopsco.ph';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const eventUrl = `${protocol}://${host}/event/${slug}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: eventUrl,
            type: 'website',
            siteName: 'FOPSCo',
            ...(image && {
                images: [
                    {
                        url: image,
                        width: imageWidth || 1200,
                        height: imageHeight || 630,
                        alt: imageAlt,
                    },
                ],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(image && { 
                images: [image],
            }),
        },
    };
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

    // Build event schema markup
    const buildEventSchema = async () => {
        const eventName = event.eventName || event.title;
        const eventDescription = event.eventSeoDescription || event.eventSummary || event.content?.replace(/<[^>]*>/g, '').substring(0, 500) || '';
        
        // Get the base URL from headers
        const headersList = await headers();
        const host = headersList.get('host') || 'fopsco.ph';
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const eventUrl = `${protocol}://${host}/event/${event.slug}`;
        
        const schema: any = {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: eventName,
            description: eventDescription,
            url: eventUrl,
        };

        // Event date and time
        if (event.eventDate) {
            const eventDate = new Date(event.eventDate);
            let startDate = eventDate.toISOString().split('T')[0];
            
            if (event.eventStartTime) {
                const [hours, minutes] = event.eventStartTime.split(':').map(Number);
                const startDateTime = new Date(eventDate);
                startDateTime.setHours(hours, minutes, 0, 0);
                startDate = startDateTime.toISOString();
            }
            
            schema.startDate = startDate;

            if (event.eventEndTime) {
                const [hours, minutes] = event.eventEndTime.split(':').map(Number);
                const endDateTime = new Date(eventDate);
                endDateTime.setHours(hours, minutes, 0, 0);
                schema.endDate = endDateTime.toISOString();
            }
        }

        // Event location
        if (event.eventMode === 'online' && event.eventOnlineUrl) {
            schema.location = {
                '@type': 'VirtualLocation',
                url: event.eventOnlineUrl,
            };
        } else if (event.eventPlace) {
            schema.location = {
                '@type': 'Place',
                name: event.eventPlace,
                ...(event.eventMapLink && { url: event.eventMapLink }),
            };
        }

        // Event image
        if (event.featuredImage?.node?.sourceUrl) {
            schema.image = event.featuredImage.node.sourceUrl;
        }

        // Event organizer/host
        if (event.eventHost) {
            schema.organizer = {
                '@type': 'Organization',
                name: event.eventHost,
            };
        }

        // Event status
        if (event.eventStatus) {
            schema.eventStatus = `https://schema.org/EventScheduled`;
            if (event.eventStatus === 'cancelled') {
                schema.eventStatus = `https://schema.org/EventCancelled`;
            } else if (event.eventStatus === 'postponed') {
                schema.eventStatus = `https://schema.org/EventPostponed`;
            }
        }

        // Event attendance mode
        if (event.eventMode) {
            if (event.eventMode === 'online') {
                schema.eventAttendanceMode = 'https://schema.org/OnlineEventAttendanceMode';
            } else if (event.eventMode === 'offline') {
                schema.eventAttendanceMode = 'https://schema.org/OfflineEventAttendanceMode';
            } else if (event.eventMode === 'mixed') {
                schema.eventAttendanceMode = 'https://schema.org/MixedEventAttendanceMode';
            }
        }

        // Event type
        if (event.eventType) {
            schema.eventType = event.eventType;
        }

        // Offers (ticket pricing)
        if (event.eventPaymentType) {
            schema.offers = {
                '@type': 'Offer',
                price: event.eventPaymentType === 'paid' ? (event.eventPrice || '0') : '0',
                priceCurrency: 'PHP',
                availability: event.eventMaxAttendees 
                    ? `https://schema.org/LimitedAvailability` 
                    : `https://schema.org/InStock`,
                ...(event.eventTicketUrl && { url: event.eventTicketUrl }),
                ...(event.eventRegistrationDeadline && {
                    validFrom: new Date().toISOString(),
                    validThrough: new Date(event.eventRegistrationDeadline).toISOString(),
                }),
            };
        }

        // Performers (speakers)
        if (event.eventSpeakers && event.eventSpeakers.length > 0) {
            schema.performer = event.eventSpeakers.map((speaker: any) => ({
                '@type': 'Person',
                name: speaker.name,
                ...(speaker.title && { jobTitle: speaker.title }),
            }));
        }

        return schema;
    };

    const eventSchema = await buildEventSchema();

    return (
        <div className="w-full bg-ghost-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
            />
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

                {event.featuredImage?.node?.sourceUrl && (
                    <div className="w-full h-72 sm:h-96 overflow-hidden rounded-xl">
                        <img
                            src={event.featuredImage.node.sourceUrl}
                            alt={event.featuredImage.node.altText || event.title}
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
                                <span className="font-semibold">Event Date</span>
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
                                <span className="font-semibold">Time</span>
                                <p>
                                    {formatTo12Hour(event.eventStartTime)}
                                    {event.eventEndTime && ` – ${formatTo12Hour(event.eventEndTime)}`}
                                </p>
                            </div>
                        )}

                        {event.eventMode && (
                            <div>
                                <span className="font-semibold">Mode</span>
                                <p className="capitalize">{event.eventMode}</p>
                            </div>
                        )}

                        {event.eventPlace && (
                            <div>
                                <span className="font-semibold">Location</span>
                                <p>{event.eventPlace}</p>
                            </div>
                        )}

                        {event.eventOnlineUrl && (
                            <div>
                                <span className="font-semibold">Online Link</span>
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
                                <span className="font-semibold">Host</span>
                                <p>{event.eventHost}</p>
                            </div>
                        )}

                        {event.eventPaymentType && (
                            <div>
                                <span className="font-semibold">Admission</span>
                                <p>
                                    {event.eventPaymentType === 'paid'
                                        ? `Paid ${event.eventPrice ? `– ${event.eventPrice}` : ''}`
                                        : 'Free'}
                                </p>
                            </div>
                        )}

                        {event.eventType && (
                            <div>
                                <span className="font-semibold">Event Type</span>
                                <p className="capitalize">{event.eventType}</p>
                            </div>
                        )}

                        {event.eventRegistrationDeadline && (
                            <div>
                                <span className="font-semibold">Registration Deadline</span>
                                <p>
                                    {new Date(event.eventRegistrationDeadline).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        )}

                        {event.eventMaxAttendees && (
                            <div>
                                <span className="font-semibold">Max Attendees</span>
                                <p>{event.eventMaxAttendees}</p>
                            </div>
                        )}

                        {event.eventMapLink && (
                            <div>
                                <span className="font-semibold">Map Link</span>
                                <p>
                                    <a
                                        href={event.eventMapLink}
                                        target="_blank"
                                        className="text-pink-600 no-underline break-all"
                                    >
                                        View on Map
                                    </a>
                                </p>
                            </div>
                        )}

                        {event.eventContactEmail && (
                            <div>
                                <span className="font-semibold">Contact Email</span>
                                <p>
                                    <a
                                        href={`mailto:${event.eventContactEmail}`}
                                        className="text-pink-600 no-underline break-all"
                                    >
                                        {event.eventContactEmail}
                                    </a>
                                </p>
                            </div>
                        )}

                        {event.eventContactPhone && (
                            <div>
                                <span className="font-semibold">Contact Phone</span>
                                <p>
                                    <a
                                        href={`tel:${event.eventContactPhone}`}
                                        className="text-pink-600 no-underline break-all"
                                    >
                                        {event.eventContactPhone}
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {event.eventTicketUrl && (
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Registration</h2>
                        <a
                            href={event.eventTicketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                        >
                            Get Tickets / Register
                        </a>
                    </section>
                )}

                {event.eventRefundPolicy && (
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Refund Policy</h2>
                        <div className="prose prose-sm max-w-none">
                            <p>{event.eventRefundPolicy}</p>
                        </div>
                    </section>
                )}

                {event.eventFullDescription && (
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Full Description</h2>
                        <div className="prose prose-sm max-w-none">
                            <p>{event.eventFullDescription}</p>
                        </div>
                    </section>
                )}

                {event.eventAgenda && event.eventAgenda.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold">Event Agenda</h2>
                        <div className="space-y-4">
                            {event.eventAgenda.map((item: any, idx: number) => (
                                <div key={idx} className="border-l-4 border-pink-600 pl-4 py-2">
                                    {item.time && (
                                        <p className="font-medium text-pink-600">{item.time}</p>
                                    )}
                                    {item.title && (
                                        <p className="font-semibold mt-1">{item.title}</p>
                                    )}
                                    {item.description && (
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {event.eventSpeakers && event.eventSpeakers.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold">Speakers</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {event.eventSpeakers.map((speaker: any, idx: number) => (
                                <div key={idx} className="flex flex-col items-center text-center space-y-2">
                                    {speaker.photo && (
                                        <img
                                            src={speaker.photo}
                                            alt={speaker.name || 'Speaker'}
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                    )}
                                    {speaker.name && (
                                        <p className="font-semibold">{speaker.name}</p>
                                    )}
                                    {speaker.title && (
                                        <p className="text-sm text-gray-600">{speaker.title}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {event.eventSponsors && event.eventSponsors.length > 0 && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold">Event Sponsors</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {event.eventSponsors.map((sponsor: any, idx: number) => (
                                <div key={idx} className="flex flex-col items-center justify-center">
                                    {sponsor.logo ? (
                                        sponsor.url ? (
                                            <a
                                                href={sponsor.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:opacity-80 transition-opacity"
                                            >
                                                <img
                                                    src={sponsor.logo}
                                                    alt={sponsor.name || 'Sponsor'}
                                                    className="max-h-20 max-w-full object-contain"
                                                />
                                            </a>
                                        ) : (
                                            <img
                                                src={sponsor.logo}
                                                alt={sponsor.name || 'Sponsor'}
                                                className="max-h-20 max-w-full object-contain"
                                            />
                                        )
                                    ) : sponsor.name ? (
                                        <p className="text-sm font-medium text-center">{sponsor.name}</p>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

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