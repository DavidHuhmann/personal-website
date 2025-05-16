import { DiscordActivity } from "./discord-activity";
import { DiscordUser } from "./discord-user";
import { SpotifyData } from "./spotify-data";

export interface ApiResponse {
  kv: NonNullable<unknown>;
  spotify: SpotifyData;
  discord_user: DiscordUser;
  activities: DiscordActivity[];
  discord_status: string;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
}
