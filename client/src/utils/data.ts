interface Link {
  title: string;
  src: string;
}

export interface PropsDataLink {
  tag: string;
  blogs: Link[];
}

export const dataLinks: PropsDataLink[] = [
  {
    tag: "Iniciando",
    blogs: [
      { title: "Home", src: "/" },
      { title: "Galeria", src: "/galeria" },
      { title: "Contatos", src: "/contatos" },
    ]
  },
  {
    tag: "JavaScript",
    blogs: [
      { title: "Formulário de Contato", src: "/javascript/formulario-contato" },
      { title: "Promises e Async/Await", src: "/javascript/promises-async-await" },
      { title: "Boas Práticas JS", src: "/javascript/boas-praticas-js" }
    ]
  },
  {
    tag: "Python",
    blogs: [
      { title: "Python para Iniciantes", src: "/python/para-iniciantes" },
      { title: "Automatizando Tarefas", src: "/python/automatizando-tarefas" },
      { title: "Análise de Dados", src: "/python/analise-de-dados" }
    ]
  },
  {
    tag: "Web Development",
    blogs: [
      { title: "Landing Page Básica", src: "/web-development/landing-page-basica" },
      { title: "Design Responsivo", src: "/web-development/design-responsivo" },
      { title: "SEO em Web Dev", src: "/web-development/seo-em-web-dev" }
    ]
  },
  {
    tag: "Machine Learning",
    blogs: [
      { title: "Intro ao Machine Learning", src: "/machine-learning/intro" },
      { title: "Redes Neurais Básicas", src: "/machine-learning/redes-neurais" },
      { title: "Escolha de Algoritmos", src: "/machine-learning/escolha-algoritmos" }
    ]
  },
  {
    tag: "Data Science",
    blogs: [
      { title: "Análise Exploratória", src: "/data-science/analise-exploratoria" },
      { title: "O que é Data Science?", src: "/data-science/o-que-e" },
      { title: "Limpando Dados", src: "/data-science/limpando-dados" }
    ]
  },
  {
    tag: "Front-End",
    blogs: [
      { title: "Componentes Reutilizáveis", src: "/front-end/componentes-reutilizaveis" },
      { title: "Ciclo de Vida em React", src: "/front-end/ciclo-vida-react" },
      { title: "Animações com Framer", src: "/front-end/animacoes-framer" }
    ]
  },
  {
    tag: "Back-End",
    blogs: [
      { title: "APIs com Node.js", src: "/back-end/apis-com-nodejs" },
      { title: "Servidores com Express", src: "/back-end/servidores-com-express" },
      { title: "Banco de Dados com SQL", src: "/back-end/banco-de-dados-sql" }
    ]
  },
  {
    tag: "DevOps",
    blogs: [
      { title: "O que é DevOps?", src: "/devops/o-que-e" },
      { title: "CI/CD com Jenkins", src: "/devops/cicd-jenkins" },
      { title: "Infra com Terraform", src: "/devops/infra-com-terraform" }
    ]
  },
  {
    tag: "API Development",
    blogs: [
      { title: "APIs REST Básico", src: "/api-development/apis-rest-basico" },
      { title: "Segurança em APIs", src: "/api-development/seguranca-em-apis" },
      { title: "GraphQL para APIs", src: "/api-development/graphql-para-apis" }
    ]
  },
  {
    tag: "Open Source",
    blogs: [
      { title: "Contribuindo para OS", src: "/open-source/contribuindo-para-os" },
      { title: "Importância do Open Source", src: "/open-source/importancia-do-os" },
      { title: "Iniciando um Projeto", src: "/open-source/iniciando-projeto" }
    ]
  }
];
