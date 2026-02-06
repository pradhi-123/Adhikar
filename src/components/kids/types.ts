
export type Language = 'en' | 'hi' | 'ta';

export interface Helpline {
  name: string;
  number: string;
  category: string;
  state?: string;
  description: string;
}

export interface ScenarioRound {
  id: number;
  text: string;
  options: {
    text: string;
    feedback: string;
    points: number;
    explanation: string;
  }[];
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  group: 'online' | 'legal' | 'school' | 'work';
  intro: string;
  rounds: ScenarioRound[];
  badgeName: string;
  badgeIcon: string;
}

export interface AIResponse {
  whatIsHappening: string;
  yourRight: string;
  whatYouCanDo: string[];
  needHelp: string[];
}
