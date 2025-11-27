# Portfolio

Este é o repositório do meu portfólio pessoal, desenvolvido com **Next.js** e **TypeScript**. O objetivo deste projeto é apresentar minhas habilidades, experiências e projetos de forma profissional e interativa.

## Tecnologias Utilizadas

- **Next.js**: Framework React para produção e renderização do lado do servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **Vercel**: Plataforma de hospedagem para aplicações web modernas.

## Estrutura do Projeto

A estrutura do projeto segue boas práticas de organização para facilitar a manutenção e escalabilidade:

```
portfolio/
├── app/                # Páginas e layouts principais
│   ├── globals.css     # Estilos globais
│   ├── layout.tsx      # Layout padrão
│   └── page.tsx        # Página inicial
├── components/         # Componentes reutilizáveis
│   ├── contact.tsx     # Seção de contato
│   ├── hero.tsx        # Seção de introdução
│   ├── repositories.tsx # Seção de repositórios
│   ├── skills.tsx      # Seção de habilidades
│   ├── stats.tsx       # Seção de estatísticas
│   └── ui/             # Componentes de interface (Badge, Button, Card, etc.)
├── lib/                # Funções utilitárias
├── public/             # Arquivos estáticos
├── next.config.ts      # Configurações do Next.js
├── tsconfig.json       # Configurações do TypeScript
└── package.json        # Dependências do projeto
```

## Funcionalidades

- **Seção Hero**: Apresentação com nome, título e descrição profissional.
- **Seção Skills**: Tecnologias e ferramentas que domino, com ícones dinâmicos.
- **Seção Stats**: Estatísticas do GitHub integradas.
- **Seção Repositories**: Lista de repositórios destacados.
- **Seção Contact**: Links para redes sociais e contato direto via WhatsApp e e-mail.

## Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/EliaasSantanaa/portfolio.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd portfolio
   ```

3. Instale as dependências:

   ```bash
   yarn install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   yarn dev
   ```

5. Acesse o projeto no navegador:

   ```
   http://localhost:3000
   ```

## Boas Práticas Adotadas

- **Componentização**: Componentes reutilizáveis para facilitar a manutenção.
- **Responsividade**: Layouts otimizados para diferentes tamanhos de tela.
- **Acessibilidade**: Uso de atributos semânticos e práticas para melhorar a experiência de todos os usuários.
- **Otimização de Imagens**: Uso do componente `next/image` para carregamento eficiente.
- **Código Limpo**: Seguindo padrões de estilo com ESLint e Prettier.

## Deploy

O projeto está hospedado na **Vercel**. Cada push para o branch principal dispara automaticamente um novo deploy.

## Contato

Se você deseja entrar em contato, utilize uma das opções abaixo:

- **E-mail**: [eliaassantana00@gmail.com](mailto:eliaassantana00@gmail.com)
- **LinkedIn**: [linkedin.com/in/eliaassantana](https://linkedin.com/in/eliaassantana)
- **WhatsApp**: [Clique aqui para enviar uma mensagem](https://wa.me/5511949913854)

---

