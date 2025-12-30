"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Star,
  GitFork,
  Clock,
  Code2,
  Eye,
  LayoutGrid,
  List,
  Search,
  Filter,
  Info,
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ProjectDetailsModal } from "@/components/project-details-modal";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  created_at?: string;
  default_branch: string;
  readme?: string;
  homepage?: string;
  size?: number;
  open_issues_count?: number;
  fork?: boolean;
  license?: {
    name: string;
    spdx_id: string;
  };
}

export function Repositories() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReposWithReadme = async () => {
      try {
        console.log("Fetching repositories...");

        // Verificar cache do localStorage (válido por 1 hora)
        const cacheKey = "github-repos-cache";
        const cacheTimeKey = "github-repos-cache-time";
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(cacheTimeKey);

        const ONE_HOUR = 60 * 60 * 1000;
        const now = Date.now();

        // Usar cache se ainda for válido
        if (cachedData && cacheTime && now - parseInt(cacheTime) < ONE_HOUR) {
          console.log("Using cached repositories data");
          const parsedData = JSON.parse(cachedData);
          setRepos(parsedData);
          setFilteredRepos(parsedData);
          setLoading(false);
          return;
        }

        console.log("Fetching fresh data from GitHub API...");

        // Buscar repositórios da API do GitHub
        const response = await fetch(
          "https://api.github.com/users/EliaasSantanaa/repos?sort=updated&per_page=100",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("GitHub API error:", errorText);

          // Se for rate limit e temos cache antigo, usar o cache mesmo expirado
          if (response.status === 403 && cachedData) {
            console.warn("Rate limit exceeded, using expired cache");
            const parsedData = JSON.parse(cachedData);
            setRepos(parsedData);
            setFilteredRepos(parsedData);
            setLoading(false);
            return;
          }

          throw new Error(
            response.status === 403
              ? "Rate Limit do GitHub atingido. Os repositórios serão carregados em cache na próxima visita."
              : `GitHub API retornou status ${response.status}`
          );
        }

        const reposData = await response.json();
        console.log("Repositories fetched:", reposData.length);

        // Verificar se reposData é um array
        if (!Array.isArray(reposData)) {
          console.error("GitHub API returned unexpected format:", reposData);
          throw new Error("Formato de dados inesperado da API");
        }

        if (reposData.length === 0) {
          console.warn("No repositories found");
          setRepos([]);
          setFilteredRepos([]);
          setLoading(false);
          return;
        }

        // Filtrar e processar repositórios
        const filteredData = (reposData as Repository[])
          .filter((repo) => !repo.fork) // Remover forks
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
          .slice(0, 12); // Limitar a 12 repositórios

        console.log(
          `Showing ${filteredData.length} repositories (after filtering)`
        );

        // Buscar README apenas para os primeiros repositórios
        const reposWithReadme = await Promise.all(
          filteredData.map(async (repo) => {
            let readme = repo.description;

            try {
              const readmeResponse = await fetch(
                `https://api.github.com/repos/EliaasSantanaa/${repo.name}/readme`,
                {
                  headers: {
                    Accept: "application/vnd.github.v3.raw",
                  },
                }
              );

              if (readmeResponse.ok) {
                const readmeContent = await readmeResponse.text();
                const excerpt = extractReadmeExcerpt(readmeContent);
                if (excerpt) readme = excerpt;
              }
            } catch {
              // Silently fail, use description instead
              console.debug(`README not found for ${repo.name}`);
            }

            return { ...repo, readme };
          })
        );

        console.log("All data processed successfully");

        // Salvar no cache
        try {
          localStorage.setItem(cacheKey, JSON.stringify(reposWithReadme));
          localStorage.setItem(cacheTimeKey, now.toString());
          console.log("Data cached successfully");
        } catch (e) {
          console.warn("Failed to cache data:", e);
        }

        setRepos(reposWithReadme);
        setFilteredRepos(reposWithReadme);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Erro ao carregar repositórios. Tente novamente mais tarde."
        );
        setLoading(false);
      }
    };

    fetchReposWithReadme();
  }, []);

  useEffect(() => {
    let filtered = repos;

    if (searchTerm) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.topics?.some((topic) =>
            topic.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedLanguage) {
      filtered = filtered.filter((repo) => repo.language === selectedLanguage);
    }

    setFilteredRepos(filtered);
  }, [searchTerm, selectedLanguage, repos]);

  const extractReadmeExcerpt = (readme: string): string => {
    const lines = readme.split("\n").filter((line) => {
      const trimmed = line.trim();
      return (
        trimmed &&
        !trimmed.startsWith("#") &&
        !trimmed.startsWith("!") &&
        !trimmed.startsWith("[") &&
        !trimmed.startsWith("<") &&
        trimmed.length > 30
      );
    });
    return lines[0]?.substring(0, 150) || "";
  };

  const languages = Array.from(
    new Set(repos.map((repo) => repo.language).filter(Boolean))
  );

  const getRelativeTime = (date: string) => {
    const now = new Date();
    const updated = new Date(date);
    const diffInDays = Math.floor(
      (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "hoje";
    if (diffInDays === 1) return "ontem";
    if (diffInDays < 30) return `${diffInDays} dias atrás`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} meses atrás`;
    return `${Math.floor(diffInDays / 365)} anos atrás`;
  };

  if (loading) {
    return (
      <section id="projects" className="px-4 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-5/6 mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded w-16" />
                  <div className="h-6 bg-muted rounded w-16" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="px-4 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Card className="p-12 text-center">
            <Code2 className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              Erro ao Carregar Repositórios
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <p className="text-sm text-muted-foreground mb-6">
              {error.includes("Rate Limit") ? (
                <>
                  💡 <strong>Dica:</strong> Recarregue a página após alguns
                  minutos. Os dados serão armazenados em cache por 1 hora.
                </>
              ) : (
                "Verifique o console do navegador (F12) para mais detalhes"
              )}
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => {
                  localStorage.removeItem("github-repos-cache");
                  localStorage.removeItem("github-repos-cache-time");
                  window.location.reload();
                }}
              >
                Limpar Cache e Tentar Novamente
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open("https://github.com/EliaasSantanaa", "_blank")
                }
              >
                Ver no GitHub
              </Button>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  // Empty state when no repos after loading
  if (!loading && repos.length === 0) {
    return (
      <section id="projects" className="px-4 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Card className="p-12 text-center">
            <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              Nenhum Repositório Encontrado
            </h3>
            <p className="text-muted-foreground mb-6">
              Não foram encontrados repositórios públicos
            </p>
            <Button
              onClick={() =>
                window.open("https://github.com/EliaasSantanaa", "_blank")
              }
            >
              Ver Perfil no GitHub
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="px-4 py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Code2 className="h-4 w-4" />
            <span>Portfólio de Projetos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projetos em Destaque
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore meus projetos mais recentes e relevantes, com código aberto
            e tecnologias modernas
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={selectedLanguage || ""}
                onChange={(e) => setSelectedLanguage(e.target.value || null)}
                className="px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Todas linguagens</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 border border-input rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {filteredRepos.length}{" "}
          {filteredRepos.length === 1
            ? "projeto encontrado"
            : "projetos encontrados"}
        </p>

        {/* Projects Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredRepos.map((repo, idx) => (
            <Card
              key={repo.id}
              className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-muted hover:border-primary/50 ${
                viewMode === "list" ? "flex flex-row" : "flex flex-col"
              }`}
              style={{
                animationDelay: `${idx * 50}ms`,
              }}
            >
              {/* Language Icon Badge */}
              {repo.language && (
                <div
                  className={`absolute ${
                    viewMode === "list" ? "top-4 right-4" : "top-3 right-3"
                  } z-10`}
                >
                  <Image
                    src={`https://skillicons.dev/icons?i=${getLanguageIcon(
                      repo.language
                    )}`}
                    alt={repo.language}
                    width={32}
                    height={32}
                    className="rounded-lg shadow-lg"
                    unoptimized
                  />
                </div>
              )}

              <div
                className={`p-6 flex-1 flex flex-col ${
                  viewMode === "list" ? "w-full" : ""
                }`}
              >
                {/* Header */}
                <div className="space-y-3 mb-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1 pr-10">
                    {repo.name}
                  </h3>

                  {/* Description from README or fallback */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {repo.readme ||
                      repo.description ||
                      "No description available"}
                  </p>
                </div>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="text-xs font-normal hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{repo.topics.length - 4}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <GitFork className="h-4 w-4" />
                    <span className="font-medium">{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Eye className="h-4 w-4" />
                    <span className="font-medium">{repo.watchers_count}</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs">
                      {getRelativeTime(repo.updated_at)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2">
                  <ProjectDetailsModal
                    repo={repo}
                    trigger={
                      <Button variant="outline" className="flex-1 group/btn">
                        <Info className="h-4 w-4 mr-2" />
                        <span>Ver Detalhes</span>
                      </Button>
                    }
                  />
                  <Button
                    variant="default"
                    size="icon"
                    asChild
                    title="Ver Código"
                  >
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  {repo.homepage && (
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      title="Ver Demo"
                    >
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou a busca
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function getLanguageIcon(language: string): string {
  const iconMap: Record<string, string> = {
    TypeScript: "ts",
    JavaScript: "js",
    Python: "py",
    Java: "java",
    "C++": "cpp",
    C: "c",
    "C#": "cs",
    Go: "go",
    Rust: "rust",
    Ruby: "ruby",
    PHP: "php",
    Swift: "swift",
    Kotlin: "kotlin",
    Dart: "dart",
    HTML: "html",
    CSS: "css",
    Vue: "vue",
    React: "react",
    Angular: "angular",
  };
  return iconMap[language] || language.toLowerCase();
}
