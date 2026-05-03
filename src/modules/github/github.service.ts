import { Octokit } from '@octokit/rest';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';

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

  async findByName(name: string) {
    try {
      const { data } = await this.octokit.repos.get({
        owner: this.owner,
        repo: name,
      });

      return {
        message: 'Repository data fetched successfully.',
        data: data,
      };
    } catch (error) {
      console.error('Error fetching repository data:', error);
      throw new BadRequestException(
        'Failed to fetch repository data from GitHub.',
      );
    }
  }
}
