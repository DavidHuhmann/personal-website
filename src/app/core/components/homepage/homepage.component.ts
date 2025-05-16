import { Component, inject, OnInit } from '@angular/core';
import { DiscordService } from '../../services/discord/discord.service';
import { SpotifyData } from '../../services/discord/entities/spotify-data';
import { DiscordUser } from '../../services/discord/entities/discord-user';
import { DiscordActivity } from '../../services/discord/entities/discord-activity';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { svglSpotify, svglDiscord } from '@ng-icons/svgl';
import { DiscordColors } from '../../services/discord/entities/discord-colors';
import { TranslatePipe } from '@ngx-translate/core';

import { NgxParticlesComponent } from '@omnedia/ngx-particles';
import { ThemeService } from '../../services/theme/theme.service';
import { ThemeMode } from '../../services/theme/entities/theme-mode';

@Component({
  selector: 'dqvid-homepage',
  imports: [NgIcon, TranslatePipe, NgxParticlesComponent],
  viewProviders: [provideIcons({ svglSpotify, svglDiscord })],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  private discordService = inject(DiscordService);
  private themeService = inject(ThemeService);
  theme?: ThemeMode;
  discordUser?: DiscordUser;
  discordStatus?: string;
  spotifyData?: SpotifyData;
  activities?: DiscordActivity[];

  ngOnInit(): void {
    this.themeService.theme$.subscribe(theme => {
      this.theme = theme as ThemeMode;
    });
    this.discordService.getUserData().subscribe(data => {
      if (!data?.discord_user) return;
      this.discordUser = data.discord_user;
      this.discordStatus = data.discord_status;
      this.spotifyData = data.spotify;
      this.activities = data.activities;
    });
  }

  getColor(status: string) {
    return DiscordColors[status as keyof typeof DiscordColors] || DiscordColors['offline'];
  }
}
