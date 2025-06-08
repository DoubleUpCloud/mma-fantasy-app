import { supabase } from './supabase';
import { Bout } from '@/models';

// Define the structure of the bout data coming from the API
interface ApiBout {
  id: number;
  event_id: number;
  left_fighter: string;
  right_fighter: string;
  left_record?: string;
  right_record?: string;
  fighter_left_id: number;
  fighter_right_id: number;
  weight_class: string;
  is_main_event: boolean;
  is_title_fight: boolean;
  status: string;
  result?: string;
  created_at: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// Search fighters by name
export async function searchFighters(name: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/fighters/search?name=${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to search fighters');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching fighters:', error);
    throw error;
  }
}

// Fetch all fighters
export async function fetchFighters() {
  try {
    const response = await fetch(`${API_BASE_URL}/fighters`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch fighters');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching fighters:', error);
    throw error;
  }
}

// Fetch all events
export async function fetchEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}



export async function getAllUserBouts() {
  try {
    const response = await fetch(`${API_BASE_URL}/user-bets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

// export const logout = async (router: NextRouter) => {
//   await fetch(`${API_BASE_URL}/logout`, {
//     method: "POST",
//     credentials: "include",
//   });
//   router.push("/auth/login");
// };

// Fetch a specific event by ID
export async function fetchEventById(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch event with ID ${id}`);
    }

    const data = await response.json();

    // Transform the bouts data to match the expected model structure
    if (data.bouts && Array.isArray(data.bouts)) {
      data.bouts = data.bouts.map((bout: ApiBout) => ({
        ...bout,
        fighter1_name: bout.left_fighter,
        fighter2_name: bout.right_fighter,
        fighter1_record: bout.left_record,
        fighter2_record: bout.right_record,
        fighter1_id: bout.fighter_left_id,
        fighter2_id: bout.fighter_right_id
      }));
    }

    return data;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw error;
  }
}
