"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Star,
  GitFork,
  Eye,
  Code2,
  Calendar,
  BookOpen,
  Globe,
  Info,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  license?: {
    name: string;
    spdx_id: string;
  };
}

interface ProjectDetailsModalProps {
  repo: Repository;
  trigger?: React.ReactNode;
}

export function ProjectDetailsModal({
  repo,
  trigger,
}: ProjectDetailsModalProps) {
  const [fullReadme, setFullReadme] = useState<string | null>(null);
  const [loadingReadme, setLoadingReadme] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchFullReadme = async () => {
    if (fullReadme) return; // Already loaded

    setLoadingReadme(true);
    try {
      const response = await fetch(
        `https://api.github.com/repos/EliaasSantanaa/${repo.name}/readme`,
        {
          headers: {
            Accept: "application/vnd.github.v3.raw",
          },
        }
      );
      if (response.ok) {
        const content = await response.text();
        setFullReadme(content);
      }
    } catch (error) {
      console.error("Error fetching full README:", error);
      setFullReadme("README não disponível");
    } finally {
      setLoadingReadme(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && !fullReadme) {
      fetchFullReadme();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getLanguageIcon = (language: string): string => {
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
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader className="space-y-4">
          <div className="flex items-start gap-4">
            {repo.language && (
              <Image
                src={`https://skillicons.dev/icons?i=${getLanguageIcon(
                  repo.language
                )}`}
                alt={repo.language}
                width={48}
                height={48}
                className="rounded-lg shadow-lg"
                unoptimized
              />
            )}
            <div className="flex-1 space-y-2">
              <DialogTitle className="text-2xl md:text-3xl font-bold">
                {repo.name}
              </DialogTitle>
              <DialogDescription className="text-base">
                {repo.description || "Sem descrição disponível"}
              </DialogDescription>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <div>
                <p className="text-xs text-muted-foreground">Stars</p>
                <p className="text-lg font-bold">{repo.stargazers_count}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <GitFork className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Forks</p>
                <p className="text-lg font-bold">{repo.forks_count}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <Eye className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Watchers</p>
                <p className="text-lg font-bold">{repo.watchers_count}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <Code2 className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Issues</p>
                <p className="text-lg font-bold">
                  {repo.open_issues_count || 0}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="space-y-6">
            {/* Topics/Tags */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Tecnologias & Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {repo.topics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Informações do Projeto
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Criado em:</span>{" "}
                    {repo.created_at ? formatDate(repo.created_at) : "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Última atualização:</span>{" "}
                    {formatDate(repo.updated_at)}
                  </p>
                  <p>
                    <span className="font-medium">Branch principal:</span>{" "}
                    {repo.default_branch}
                  </p>
                  {repo.license && (
                    <p>
                      <span className="font-medium">Licença:</span>{" "}
                      {repo.license.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Detalhes Técnicos
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Linguagem principal:</span>{" "}
                    {repo.language || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Tamanho:</span>{" "}
                    {repo.size ? `${(repo.size / 1024).toFixed(2)} MB` : "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Issues abertas:</span>{" "}
                    {repo.open_issues_count || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* README */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                README
              </h3>
              <div className="rounded-lg border bg-muted/30 p-4">
                {loadingReadme ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2 text-sm text-muted-foreground">
                      Carregando README...
                    </span>
                  </div>
                ) : fullReadme ? (
                  <pre className="text-sm whitespace-pre-wrap break-word font-mono leading-relaxed">
                    {fullReadme}
                  </pre>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    README não disponível
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
          <Button className="flex-1" asChild>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver no GitHub
            </a>
          </Button>
          {repo.homepage && (
            <Button variant="outline" className="flex-1" asChild>
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Ver Demo ao Vivo
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
