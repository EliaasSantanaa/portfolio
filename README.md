<div align="center">

# 🚀 Portfólio Profissional

### Elias Santana Santos

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

**[🌐 Ver Projeto Online](https://portfolio-eliassantana.vercel.app)** • **[📧 Contato](mailto:eliaassantana00@gmail.com)** • **[💼 LinkedIn](https://linkedin.com/in/elias-santana-santos)**

</div>

---

## 📋 Sobre o Projeto

Portfólio profissional desenvolvido com as mais modernas tecnologias do ecossistema React, apresentando minhas habilidades, projetos e experiências de forma elegante e interativa. O projeto foi construído com foco em **performance**, **acessibilidade** e **experiência do usuário**.

### ✨ Destaques

- 🎨 **Design Moderno**: Interface clean e profissional com animações suaves
- 📱 **100% Responsivo**: Otimizado para todos os dispositivos e tamanhos de tela
- ⚡ **Performance Otimizada**: Carregamento rápido e experiência fluida
- 🌓 **Dark/Light Mode**: Suporte a temas claro e escuro
- ♿ **Acessível**: Seguindo as melhores práticas de acessibilidade (WCAG)
- 🔍 **SEO Otimizado**: Meta tags e estrutura semântica para melhor indexação

## 🛠️ Stack Tecnológica

### Core

- **[Next.js 15.2](https://nextjs.org/)** - Framework React com Server-Side Rendering
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first

### UI/UX

- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e sem estilo
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e customizáveis
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Gerenciamento de temas
- **[class-variance-authority](https://cva.style/)** - Variantes de componentes tipadas

### Ferramentas & Qualidade

- **[ESLint](https://eslint.org/)** - Linter para código JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[Vercel Analytics](https://vercel.com/analytics)** - Análise de performance e uso

## 📁 Estrutura do Projeto

```
portfolio/
├── 📂 app/                      # App Router (Next.js 13+)
│   ├── 📄 globals.css          # Estilos globais e variáveis CSS
│   ├── 📄 layout.tsx           # Layout raiz da aplicação
│   └── 📄 page.tsx             # Página inicial (Home)
│
├── 📂 components/               # Componentes React
│   ├── 📄 navbar.tsx           # Barra de navegação responsiva
│   ├── 📄 hero.tsx             # Seção Hero com apresentação
│   ├── 📄 stats.tsx            # Estatísticas do GitHub
│   ├── 📄 skills.tsx           # Tecnologias e habilidades
│   ├── 📄 repositories.tsx     # Projetos em destaque
│   ├── 📄 contact.tsx          # Formulário de contato
│   ├── 📄 scroll-to-top.tsx    # Botão voltar ao topo
│   └── 📂 ui/                  # Componentes base (shadcn/ui)
│       ├── 📄 button.tsx
│       ├── 📄 card.tsx
│       ├── 📄 badge.tsx
│       └── ...
│
├── 📂 lib/                     # Utilitários e helpers
│   └── 📄 utils.ts            # Funções auxiliares
│
├── 📂 public/                  # Arquivos estáticos
│
├── 📄 next.config.ts          # Configuração do Next.js
├── 📄 tailwind.config.ts      # Configuração do Tailwind
├── 📄 tsconfig.json           # Configuração do TypeScript
└── 📄 package.json            # Dependências e scripts
```

## 🎯 Funcionalidades

### 🏠 Home & Hero

- Apresentação profissional com animações de entrada
- Links para redes sociais e GitHub
- Indicador de scroll animado
- Efeitos de gradiente e blur no background

### 💻 Skills & Tecnologias

- Carrossel interativo de tecnologias
- Ícones dinâmicos do [Skill Icons](https://skillicons.dev/)
- Categorização por área (Frontend, Backend, Database, DevOps)
- Animações hover e transições suaves

### 📊 Estatísticas GitHub

- Integração em tempo real com GitHub API
- Exibição de repositórios, stars, followers
- Atualização automática de dados

### 🚀 Projetos em Destaque

- **Listagem dinâmica** de repositórios do GitHub
- **Descrições do README** extraídas automaticamente
- **Filtros avançados** por linguagem e busca
- **Visualização Grid/List** alternável
- **Badges de tecnologias** e tópicos
- **Estatísticas** (stars, forks, watchers)
- **Links diretos** para código e demo ao vivo

### 📧 Contato

- Links para todas as redes sociais
- Botão direto para WhatsApp
- Email com assunto pré-preenchido
- Layout responsivo e acessível

### 🎨 Experiência do Usuário

- **Navegação suave** entre seções
- **Loading states** elegantes
- **Animações performáticas** com CSS
- **Botão "Voltar ao topo"** com scroll spy
- **Navbar fixa** com efeito blur ao rolar

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18.x ou superior
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/EliaasSantanaa/portfolio.git
   cd portfolio
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa o linter
```

## 📦 Build e Deploy

### Build de Produção

```bash
npm run build
npm run start
```

### Deploy na Vercel

O projeto está configurado para deploy automático na Vercel:

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente (se necessário)
3. Cada push para `main` dispara um novo deploy automaticamente

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/EliaasSantanaa/portfolio)

## 🎨 Personalização

### Cores e Temas

As cores do projeto são definidas em `app/globals.css` usando variáveis CSS:

```css
:root {
  --background: oklch(0.98 0.005 240);
  --foreground: oklch(0.15 0.02 240);
  --primary: oklch(0.55 0.18 200);
  /* ... */
}
```

### Componentes UI

Os componentes base são do [shadcn/ui](https://ui.shadcn.com/) e podem ser customizados em `components/ui/`.

## 🔧 Boas Práticas Implementadas

- ✅ **TypeScript Strict Mode** para segurança de tipos
- ✅ **Componentização** modular e reutilizável
- ✅ **Server Components** do Next.js quando possível
- ✅ **Client Components** apenas quando necessário
- ✅ **Otimização de Imagens** com `next/image`
- ✅ **Lazy Loading** de componentes pesados
- ✅ **Code Splitting** automático do Next.js
- ✅ **SEO** com metadata otimizada
- ✅ **Acessibilidade** (ARIA labels, navegação por teclado)
- ✅ **Responsividade** mobile-first
- ✅ **Performance** (Core Web Vitals otimizados)

## 📈 Performance

- ⚡ **Lighthouse Score**: 95+ em todas as categorias
- 🎯 **First Contentful Paint**: < 1.5s
- 📊 **Time to Interactive**: < 2.5s
- 🔄 **Cumulative Layout Shift**: < 0.1

## 🤝 Contribuições

Sugestões e melhorias são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📞 Contato

**Elias Santana Santos** - Full Stack Developer

- 📧 Email: [eliaassantana00@gmail.com](mailto:eliaassantana00@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/elias-santana-santos](https://linkedin.com/in/elias-santana-santos)
- 🐙 GitHub: [@EliaasSantanaa](https://github.com/EliaasSantanaa)
- 💬 WhatsApp: [Enviar mensagem](https://wa.me/5511949913854)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

Feito por [Elias Santana Santos](https://github.com/EliaasSantanaa)

</div>
