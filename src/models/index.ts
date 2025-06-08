/**
 * Models for the Fantasy MMA application
 */

/**
 * Represents a type of bet that can be placed on a bout
 */
export interface BetType {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface Leaders {
  id: string;
  created_at: string;
  name: string;
  points: number;
  total_bets: number;
}

/**
 * Represents a bet placed by a user on a bout
 */
export interface UserBet {
  bout_id: number;
  bet_type_id: number;
  predicted_winner: string;
  result?: boolean | null;
  created_at: string;
}

export interface UserEventBets {
  user_id: string,
  bout_id: number,
  bet_type_id: number,
  predicted_winner: number,
  created_at: string,
  points: number,
  bouts: object,
  predicted_fighter: object
}

/**
 * Represents a bout (fight) between two fighters
 */

export interface Result {
  winner_id: number;
  winner_name: string;
  bet_type: string;
  round: number;
  time: string;
  details: string;
}

export interface Bout {
  id: number;
  event_id: number;
  fighter1_id: number;
  fighter2_id: number;
  fighter1_name?: string;
  fighter2_name?: string;
  fighter1_record?: string;
  fighter2_record?: string;
  weight_class: string;
  is_main_event: boolean;
  is_title_fight: boolean;
  status: string;
  result?: Result;
  created_at: string;

}

/**
 * Represents a fighter
 */
export interface Fighter {
  id: number;
  name: string;
  nickname?: string;
  record?: string;
  country?: string;
  created_at: string;
}

/**
 * Represents an MMA event
 */
export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  organization: string;
  status: string;
  created_at: string;
  bouts?: Bout[];

}

