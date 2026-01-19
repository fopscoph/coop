export const EVENTS_META_LIST_QUERY = `
    query EventsMetaList($first: Int!) {
        events(first: $first) {
            nodes {
                id
                title
                slug
                date

                eventDate
                eventPaymentType

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
            }
        }
    }
`;