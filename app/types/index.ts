export type Item = {
  date: string;
  title: string;
  description?: string;
  solutions?: string[];
  events?: {
    problem: string;
    soluions: string[];
  }[];
};
