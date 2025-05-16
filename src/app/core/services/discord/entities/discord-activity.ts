export interface DiscordActivity {
  id?: string;
  name?: string;
  type?: number;
  state?: string;
  details?: string;
  timestamps?: {
    start: number;
  };
  application_id?: string;
  assets?: {
    large_image: string;
    large_text: string;
    small_image: string;
    small_text: string;
  };
  sync_id?: string;
  created_at?: number;
  party?: {
    id: string;
  };
}
