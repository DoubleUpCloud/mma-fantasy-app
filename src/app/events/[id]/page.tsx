import { fetchEventById } from '@/lib/api';
import EventDetail from '@/components/events/EventDetail';

interface Bout {
  id: number;
  event_id: number;
  fighter_left_id: number;
  fighter_right_id: number;
  left_fighter: string;
  right_fighter: string;
  left_record: string;
  right_record: string;
  created_at: string;
  updated_at: string;
}

interface Event {
  id: number;
  created_at: string;
  name: string;
  date: string;
  location: string;
  updated_at: string;
  bouts: Bout[];
}

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
