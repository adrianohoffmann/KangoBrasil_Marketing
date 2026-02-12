
import React from 'react';

export const COLORS = {
  primary: '#016CB4', // Deep Blue
  secondary: '#006D2C', // Forest Green
  accent: '#E6C01F', // Gold/Yellow
  background: '#0f1115', // Charcoal
};

export const INITIAL_DATA = [
  {
    "title": "Planejamento Marketing 2026",
    "category": "Outros",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Marketing2.jpg",
    "pdfUrl": "https://drive.google.com/file/d/1lUI4KHHPlFbW-6Wxkwb-t5rrBjaH2J8o/view?usp=drive_link",
    "description": "Do conceito à execução. Dê um play e descubra os bastidores da estratégia que vai elevar o patamar da Kango Brasil no mercado de infraestrutura esportiva em 2026.",
    "isFeatured": false,
    "id": "1770925498201"
  },
  {
    "title": "Dashboard Pré-Venda",
    "category": "Dashboards",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Dashboard-PreVenda.jpg",
    "pdfUrl": "https://lookerstudio.google.com/reporting/35c9dbb5-2ce0-4270-a3e9-77d151319576",
    "description": "Uma visão detalhada sobre a prospecção e qualificação de novos projetos. Entenda como identificamos arenas, clubes e prefeituras com potencial para receberem a infraestrutura de elite da Kango Brasil, garantindo que cada lead seja uma semente para um grande projeto.",
    "isFeatured": false,
    "id": "1770915921604"
  },
  {
    "title": "Dashboard Comercial",
    "category": "Dashboards",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Dashboard-Comercial.jpg",
    "pdfUrl": "https://lookerstudio.google.com/reporting/9a5c5d2d-f11a-4f9d-b8b8-1eb7d7352be4",
    "description": "O Motor do Nosso Crescimento. Uma visão estratégica sobre nossos indicadores de performance, metas batidas e expansão de mercado. Explore os dados que guiam a Kango Brasil rumo à liderança em infraestrutura esportiva e entenda como transformamos oportunidades em resultados sólidos.",
    "isFeatured": true,
    "id": "1770915809151"
  },
  {
    "title": "Portfólio Completo",
    "category": "Outros",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Outros.jpg",
    "pdfUrl": "https://drive.google.com/file/d/1LTqSWMWHaBvaS6PQrPbS-o2uyQh196Zf/view?usp=drive_link",
    "description": "A Solução Completa de A a Z. Uma imersão total em nosso ecossistema de infraestrutura. Explore todas as nossas linhas — de pisos e gramados a arenas e vestiários — e descubra como integramos engenharia, design e alta performance para entregar projetos prontos para o sucesso.",
    "isFeatured": false,
    "id": "1770906510853"
  },
  {
    "title": "Arenas",
    "category": "Projetos",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Projetos.jpg",
    "pdfUrl": "https://drive.google.com/file/d/1IvFvJN29GkNhPg_qBiS5-dU2nXPl6gQ0/view?usp=drive_link",
    "description": "Do Projeto à Realidade. Explore nossas soluções completas em construção esportiva. Seja através de Reformas estruturais, Arenas Personalizadas desenvolvidas 100% sob medida para sua demanda, ou nossas Arenas Modulares — projetos prontos com 4 opções de capacidade e total flexibilidade para customizar cores e modelos de assentos.",
    "isFeatured": false,
    "id": "1770906234083"
  },
  {
    "title": "Grama Sintética",
    "category": "Produtos",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Grama.jpg",
    "pdfUrl": "https://drive.google.com/file/d/1KN36J-tov-FFV00s0Tui0dxyPVDw7NOT/view?usp=drive_link",
    "description": "A Revolução do Verde Permanente. Tecnologia de fibra avançada para o máximo desempenho e realismo. Dê um play e descubra como a Kango Brasil transforma terrenos em palcos esportivos de nível profissional.",
    "isFeatured": true,
    "id": "1770905416288"
  },
  {
    "title": "Armários para Vestiários",
    "category": "Produtos",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Armarios.jpg",
    "pdfUrl": "https://drive.google.com/file/d/1T4AqZbOHLviu4ctV1zazsSFHOd-CjEqk/view?usp=drive_link",
    "description": "Vestiários de Elite: Organização e Estética Superior. Explore as soluções de armários locker que transformam vestiários comuns em ambientes de alto padrão. Design inteligente e funcionalidade pensada para a rotina de atletas e usuários exigentes.",
    "isFeatured": false,
    "id": "1770905248386"
  },
  {
    "title": "Cadeiras e Assentos",
    "category": "Produtos",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Cadeiras.jpg",
    "pdfUrl": "https://drive.google.com/file/d/1ZxucULfjkPfWx6it7m4jLTm4sgS5WH6x/view?usp=drive_link",
    "description": "Assentos e Cadeiras: O Design das Grandes Arenas. Durabilidade extrema encontra a ergonomia superior. Dê um play e descubra como a Kango Brasil redefine o padrão de conforto e estética na infraestrutura de assentos esportivos.",
    "isFeatured": false,
    "id": "1770904740824"
  },
  {
    "title": "Piso Modular Esportivo",
    "category": "Produtos",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Piso.jpg",
    "pdfUrl": "https://drive.google.com/file/d/1cCzq84-i7ZcsNi5wLmV_0pLF6AYOW_WI/view?usp=drive_link",
    "description": "Alta Performance Sob Seus Pés. Descubra a tecnologia dos pisos modulares que unem máxima absorção de impacto, segurança e durabilidade. A solução ideal para elevar o nível técnico de qualquer quadra poliesportiva.",
    "isFeatured": false,
    "id": "1770904549649"
  },
  {
    "title": "Apresentação Institucional",
    "category": "Institucional",
    "coverUrl": "https://www.kango.com.br/wp-content/uploads/2026/02/Institucional.jpg",
    "pdfUrl": "https://drive.google.com/file/d/13N6jed5vxSlaFw-8LXQpcpx3v3o7Lih5/view?usp=drive_link",
    "description": "A Excelência por trás de cada Vitória. Uma visão detalhada sobre o DNA da Kango Brasil. Descubra como nossas soluções de engenharia e design transformam espaços esportivos em centros de alto desempenho e conforto para atletas e público.",
    "isFeatured": true,
    "id": "1770904365837"
  }
];

export const CATEGORIES: string[] = [
  'Institucional',
  'Produtos',
  'Projetos',
  'Dashboards',
  'Outros'
];
