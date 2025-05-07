import { fetchEventById } from '@/lib/api';
import EventDetail from '@/components/events/EventDetail';
import { Event } from '@/models';

export default async function EventDetailPage({ params }: { params: any }) {
  const eventId = parseInt(params.id);

  let event: Event | null = null;
  let error: string | null = null;

  try {
    if (isNaN(eventId)) {
      throw new Error('Invalid event ID');
    }

    event = await fetchEventById(eventId);
  } catch (err) {
    error = 'Failed to load event details. Please try again later.';
    console.error(err);
  }

  return <EventDetail event={event} error={error} />;
}
