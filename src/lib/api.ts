import { supabase } from './supabase';

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

    return await response.json();
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw error;
  }
}
