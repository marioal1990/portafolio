import { Component, computed, OnInit, signal } from '@angular/core';
import { EDUCATION, FALLBACK_REPOS, JOBS, PROFILE, SKILLS } from './data/cv';

export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage?: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string | null;
  topics?: string[];
}

const LANG_COLORS: Record<string, string> = {
  Java: '#e76f00',
  TypeScript: '#3178c6',
  JavaScript: '#e2c400',
  HTML: '#e34c26',
  CSS: '#663399',
  PHP: '#777bb4',
  Python: '#3572a5',
};

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly profile = PROFILE;
  protected readonly skills = SKILLS;
  protected readonly jobs = JOBS;
  protected readonly education = EDUCATION;
  protected readonly year = new Date().getFullYear();

  protected readonly repos = signal<Repo[]>([]);
  protected readonly loading = signal(true);
  protected readonly usingFallback = signal(false);
  protected readonly filter = signal('Todos');
  protected readonly menuOpen = signal(false);

  protected readonly languages = computed(() => {
    const langs = new Set(this.repos().map((r) => r.language).filter((l): l is string => !!l));
    return ['Todos', ...[...langs].sort()];
  });

  protected readonly visibleRepos = computed(() => {
    const f = this.filter();
    return f === 'Todos' ? this.repos() : this.repos().filter((r) => r.language === f);
  });

  async ngOnInit() {
    try {
      const res = await fetch(
        `https://api.github.com/users/${PROFILE.github}/repos?per_page=100&sort=updated`,
        { headers: { Accept: 'application/vnd.github+json' } },
      );
      if (!res.ok) throw new Error(String(res.status));
      const data: Repo[] = await res.json();
      this.repos.set(data.filter((r) => !r.fork));
    } catch {
      this.usingFallback.set(true);
      this.repos.set(
        FALLBACK_REPOS.map((r) => ({
          ...r,
          html_url: `${PROFILE.githubUrl}/${r.name}`,
          stargazers_count: 0,
          forks_count: 0,
          fork: false,
          updated_at: null,
        })),
      );
    } finally {
      this.loading.set(false);
    }
  }

  protected langColor(lang: string | null): string {
    return (lang && LANG_COLORS[lang]) || '#8b8f98';
  }

  protected updated(date: string | null): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
  }

  protected prettyName(name: string): string {
    return name.replace(/[-_]+/g, ' ');
  }
}
