
export type Category = 
  | 'Institucional' 
  | 'Produtos' 
  | 'Projetos' 
  | 'Dashboards'
  | 'Outros';

export interface Presentation {
  id: string;
  title: string;
  category: Category;
  coverUrl: string;
  pdfUrl: string;
  description: string;
  isFeatured?: boolean;
}

export interface AdminCredentials {
  password: string;
}
