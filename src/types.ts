export interface EvolutionResponseBase {
  template_type: string;
  species_or_group_name: string;
  title: string;
  summary: string;
  follow_up_questions: FollowUpQuestion[];
  metadata: {
    source_model: string;
    generated_at: string;
    version: string;
  };
}

export interface FollowUpQuestion {
  question_text: string;
  template_type: string;
  parameters: {
    species_or_group_name: string;
    related_topic?: string;
  };
}

export interface EvolutionTimelineResponse extends EvolutionResponseBase {
  timeline_events: TimelineEvent[];
}

export interface TimelineEvent {
  period: string;
  era: string;
  species: string;
  description: string;
  image_hint?: string;
}
