import { supabase } from './supabase';
import { BetType, UserBet, UserEventBets } from '../models';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
/**
 * Service for handling betting operations
 */
export const betService = {
  /**
   * Create a new bet type
   * @param betType The bet type data
   * @returns The created bet type
   */
  // async createBetType(betType: Omit<BetType, 'user_id' | 'created_at'>): Promise<BetType | null> {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/user-bets`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify(betType),  // ✅ Fixed here
  //     });
  
  //     if (!response.ok) {
  //       console.error('Failed to create bet type:', response.statusText);
  //       return null;
  //     }
  
  //     const createdBetType: BetType = await response.json();
  //     return createdBetType;
  
  //   } catch (error) {
  //     console.error('Error creating bet type:', error);
  //     return null;
  //   }
  // },

  /**
   * Get all bet types
   * @returns Array of bet types
   */
  async getAllBetTypes(): Promise<BetType[]> {
    try {
      const { data, error } = await supabase
        .from('bet_types')
        .select('*')
        .order('id');

      if (error) {
        console.error('Error getting bet types:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllBetTypes:', error);
      return [];
    }
  },

  /**
   * Get a bet type by ID
   * @param id The bet type ID
   * @returns The bet type
   */
  async getBetTypeById(id: number): Promise<BetType | null> {
    try {
      const { data, error } = await supabase
        .from('bet_types')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error getting bet type:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getBetTypeById:', error);
      return null;
    }
  },

  /**
   * Create a new user bet
   * @param userBet The user bet data
   * @returns The created user bet
   */
  async createUserBet(betType: Omit<UserBet, 'created_at' | 'result'>): Promise<UserBet | null> {
    try {
      console.log(JSON.stringify(betType))
      const response = await fetch(`${API_BASE_URL}/user-bets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(betType),  // ✅ Fixed here
      });
  
      if (!response.ok) {
        console.error('Failed to create bet type:', response.statusText);
        return null;
      }
  
      const createdUserBet: UserBet = await response.json();
      return createdUserBet;
  
    } catch (error) {
      console.error('Error creating bet type:', error);
      return null;
    }
  },

  /**
   * Get all bets for a user
   * @param userId The user ID
   * @returns Array of user bets
   */
  async getUserBets(userId: string): Promise<UserBet[]> {
    try {
      const { data, error } = await supabase
        .from('user_bets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting user bets:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserBets:', error);
      return [];
    }
  },

  /**
   * Get all bets for a bout
   * @param boutId The bout ID
   * @returns Array of user bets
   */
  async getBoutBets(boutId: number): Promise<UserBet[]> {
    try {
      const { data, error } = await supabase
        .from('user_bets')
        .select('*')
        .eq('bout_id', boutId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting bout bets:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getBoutBets:', error);
      return [];
    }
  },

  /**
   * Update the result of a user bet
   * @param userBet The user bet with updated result
   * @returns The updated user bet
   */
  async updateBetResult(userBet: Pick<UserBet,  'bout_id' | 'bet_type_id' | 'result'>): Promise<UserBet | null> {
    try {
      const { data, error } = await supabase
        .from('user_bets')
        .update({
          result: userBet.result
        })
        //.eq('user_id', userBet.user_id)
        .eq('bout_id', userBet.bout_id)
        .eq('bet_type_id', userBet.bet_type_id)
        .select()
        .single();

      if (error) {
        console.error('Error updating bet result:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in updateBetResult:', error);
      return null;
    }
  },

  async getUserBetsForEvent(eventId: number): Promise<UserEventBets[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/event/${eventId}/user-bets`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching predictions:', error);
      throw error;
    }
  }
};