export const EVENT_BY_SLUG_QUERY = `
    query EventBySlug($slug: ID!) {
        event(id: $slug, idType: SLUG) {
            id
            databaseId
            title
            slug
            status
            content
            
            featuredImage {
                node {
                    id
                    sourceUrl
                    altText
                    mediaDetails {
                    width
                    height
                    }
                }
            }     
                       
            eventCategories {
                nodes {
                    name
                    slug
                    categoryColor
                }
            }

            imageGallery {
                caption
                imageUrl
            }
            
            eventName
            eventDate
            eventStartTime
            eventEndTime
            eventType
            eventMode

            eventPlace
            eventMapLink
            eventOnlineUrl

            eventSummary
            eventFullDescription

            eventHost
            eventRegistrationDeadline
            eventMaxAttendees

            eventPaymentType
            eventPrice
            eventTicketUrl
            eventPaymentProvider
            eventRefundPolicy

            eventStatus

            eventContactEmail
            eventContactPhone

            eventSeoTitle
            eventSeoDescription

            eventSponsors {
                name
                logo
                url
            }

            eventSpeakers {
                name
                title
                photo
            }

            eventAgenda {
                time
                title
                description
            }

            eventFaq {
                question
                answer
            }
        }
    }
`;
