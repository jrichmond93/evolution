export interface EvolutionResponse {
  species: string;
  title: string;
  summary_md: string;
  key_points: string[];
  focus_area?: string;
  related_eras?: string[];
  follow_up_questions: FollowUpQuestion[];
}

export interface FollowUpQuestion {
  question: string;
  template: string;
  species?: string;
  focus?: string;
}
