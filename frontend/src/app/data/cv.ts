export interface Job {
  company: string;
  role: string;
  period: string;
  projects: { name: string; points: string[]; tech: string[] }[];
}

export const PROFILE = {
  name: 'Mario Araya Lecaros',
  title: 'Desarrollador Full Stack Senior',
  tagline: 'Java · Spring Boot · Aplicaciones empresariales',
  location: 'Santiago, Chile',
  email: 'marioal1990@gmail.com',
  github: 'marioal1990',
  githubUrl: 'https://github.com/marioal1990',
  // Reemplaza con la URL de tu perfil
  linkedinUrl: 'https://www.linkedin.com/in/marayal/',
  summary:
    'Más de 15 años desarrollando y evolucionando aplicaciones empresariales. Java es mi lenguaje principal desde 2010, con foco en Spring Boot, backend e integración de sistemas, y experiencia Full Stack con Angular y TypeScript. He trabajado en salud, banca, medios de pago, retail, aviación y sector público.',
  stats: [
    { value: '15+', label: 'años de experiencia' },
    { value: '2010', label: 'programando en Java' },
    { value: '10+', label: 'clientes empresariales' },
  ],
  clients: ['Colmena', 'Transbank', 'LATAM Airlines', 'Banco Estado', 'Registro Civil', 'Sodimac', 'Claro/VTR', 'BICE'],
};

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Lenguajes', items: ['Java 8 / 11 / 17', 'TypeScript', 'JavaScript', 'SQL', 'PHP', 'Python'] },
  { group: 'Backend', items: ['Spring Boot', 'Spring Framework', 'REST APIs', 'Node.js', 'NestJS'] },
  { group: 'Frontend', items: ['Angular', 'ExtJS', 'JSF', 'PrimeFaces', 'HTML5', 'CSS3'] },
  { group: 'Bases de datos', items: ['Oracle', 'MySQL', 'PostgreSQL', 'SQL Server', 'Sybase', 'MongoDB'] },
  { group: 'Cloud', items: ['AWS', 'Lambda', 'S3', 'Aurora', 'DocumentDB', 'DynamoDB', 'CloudFront', 'ApiGateway', 'Google Cloud'] },
  { group: 'Herramientas', items: ['Git', 'Maven', 'Gradle', 'Jenkins', 'SonarQube', 'Docker', 'Swagger'] },
];

export const JOBS: Job[] = [
  {
    company: 'Colmena',
    role: 'Desarrollador Full Stack',
    period: '2025 – 2026',
    projects: [
      {
        name: 'Aplicaciones de Afiliaciones',
        points: [
          'Nuevas funcionalidades con Java, Spring Boot, JavaScript y TypeScript.',
          'Integración de servicios externos mediante APIs y webhooks.',
          'Resolución de incidencias productivas y análisis de rendimiento.',
          'Code review con Pull Requests, diagramas C4 y manuales de usuario.',
        ],
        tech: ['Java', 'Spring Boot', 'TypeScript', 'ExtJS', 'Sybase', 'AWS', 'GCP'],
      },
    ],
  },
  {
    company: 'Aligare',
    role: 'Analista Senior',
    period: '2024 – 2025',
    projects: [
      {
        name: 'Claro/VTR – Medios de pago',
        points: [
          'Mantenimiento y evolución de aplicaciones existentes.',
          'Funcionalidades de medios de pago e integración con Servipag.',
        ],
        tech: ['Java 8/11/17', 'Spring Boot', 'PHP', 'Oracle 11g', 'WebLogic'],
      },
    ],
  },
  {
    company: 'KDU Ingeniería',
    role: 'Full Stack',
    period: '2022 – 2024',
    projects: [
      {
        name: 'Webpay – Transbank',
        points: [
          'Desarrollo y mantenimiento de soluciones de la plataforma Webpay.',
          'Backend con Spring Framework y Spring Boot sobre MySQL y Oracle.',
        ],
        tech: ['Java', 'Spring Boot', 'Bitbucket', 'Gradle', 'WebLogic', 'Kiuwan'],
      },
    ],
  },
  {
    company: 'Kibernum',
    role: 'Full Stack',
    period: '2016 – 2022',
    projects: [
      {
        name: 'Banco Estado – Integración',
        points: ['Soluciones de integración con Node.js y Java, con pruebas e integración continua.'],
        tech: ['Node.js', 'TypeScript', 'SQL Server', 'MongoDB', 'Jest', 'Jenkins'],
      },
      {
        name: 'Transformación y almacenamiento de nóminas',
        points: ['Procesamiento de nóminas con servicios cloud y bases administradas en AWS.'],
        tech: ['AWS Lambda', 'Aurora', 'DocumentDB', 'TypeScript'],
      },
    ],
  },
  {
    company: 'Zenta Group',
    role: 'Full Stack',
    period: '2016 – 2021',
    projects: [
      {
        name: 'LATAM Airlines – OneOPS',
        points: ['Servicios Java y Spring Boot sobre GCP y MySQL, con pruebas y CI.'],
        tech: ['Java 8', 'Spring Boot', 'GCP', 'MySQL', 'Swagger', 'Jenkins'],
      },
      {
        name: 'LATAM Airlines – Robot Queue, PRS y TEF',
        points: ['Aplicaciones empresariales integradas con Amadeus y SABRE.'],
        tech: ['Java', 'Angular', 'JSF', 'PrimeFaces', 'WebLogic'],
      },
      {
        name: 'Registro Civil – Tótem de Certificados',
        points: ['Solución con Spring Boot en GCP, pruebas unitarias y documentación técnica.'],
        tech: ['Spring Boot', 'GCP', 'MySQL', 'JUnit', 'Mockito'],
      },
      {
        name: 'Zentown y PDG – Portal de Gestión',
        points: ['Aplicaciones con Spring Boot, PHP y Laravel sobre PostgreSQL.'],
        tech: ['Spring Boot', 'Laravel', 'PostgreSQL', 'GCP'],
      },
    ],
  },
  {
    company: 'Moveapps',
    role: 'Backend',
    period: '2020 – 2021',
    projects: [
      {
        name: 'Sodimac – Integración',
        points: ['Backend con NestJS, pruebas unitarias e integración continua.'],
        tech: ['NestJS', 'Jest', 'GitLab', 'Jenkins'],
      },
    ],
  },
  {
    company: 'Primeros años',
    role: 'Desarrollador Java / Oracle ADF',
    period: '2010 – 2016',
    projects: [
      {
        name: 'Transtecnia · Transoluciones · Emergya · Itech-Solution',
        points: [
          'Libros Contables Electrónicos (InputLCE), HUB Recaudaciones BICE Vida, Portal de Pago IPS y Garantías Banco BICE.',
        ],
        tech: ['Java 6/7', 'Oracle ADF', 'JSF', 'WebLogic', 'Oracle', 'PostgreSQL'],
      },
    ],
  },
];

export const EDUCATION = [
  { title: 'Analista Programador de Sistemas', place: 'Instituto Profesional DuocUC', year: '2008 – 2010' },
  { title: 'SQL Interactivo', place: 'Academia Desafío Latam', year: '2024' },
  { title: 'Fundamentos de Programación – Python', place: 'Academia Desafío Latam', year: '2024' },
];

/** Respaldo si la API de GitHub no responde (límite de 60 req/h por IP). */
export const FALLBACK_REPOS = [
  { name: 'latam-birthday-be', description: 'Backend del proyecto LATAM Birthday', language: 'Java' },
  { name: 'latam-birthday-fe', description: 'Frontend del proyecto LATAM Birthday', language: 'TypeScript' },
  { name: 'spring-boot-data-jpa', description: 'Proyecto monolítico con Spring Boot, Thymeleaf, MySQL y Bootstrap', language: 'JavaScript' },
  { name: 'be_equipamiento', description: 'Back end de una aplicación de equipamiento', language: null },
  { name: 'errs-cea2011', description: 'Proyecto exportado de Google Code', language: 'Java' },
  { name: '03-bases-nodes', description: 'Primer ejemplo con Node.js', language: 'JavaScript' },
];
