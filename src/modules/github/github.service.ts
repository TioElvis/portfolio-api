import { Octokit } from '@octokit/rest';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubService {
  private owner: string;
  private octokit: Octokit;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.octokit = new Octokit({
      auth: this.configService.get<string>('GITHUB_TOKEN'),
    });
    this.owner = this.configService.get<string>('GITHUB_OWNER')!;
  }
}
