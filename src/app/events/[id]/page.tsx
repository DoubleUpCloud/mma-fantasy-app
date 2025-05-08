import { fetchEventById } from '@/lib/api';
import EventDetail from '@/components/events/EventDetail';
import { Event, Bout } from '@/models';

export default async function EventDetailPage({ params }: { params: any }) {
  const eventId = parseInt(params.id);

  let event: Event | null = null;
  let error: string | null = null;
  let isEnded: boolean | null = null;

  try {
    if (isNaN(eventId)) {
      throw new Error('Invalid event ID');
    }

    event = await fetchEventById(eventId);
    isEnded = new Date(event!.date) > new Date();
  } catch (err) {
    error = 'Failed to load event details. Please try again later.';
    console.error(err);
  }

  console.log(event!.bouts)

  return <EventDetail event={event} error={error} isEnded={isEnded}/>;
}
