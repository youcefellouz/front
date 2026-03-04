export interface Discount {
  id: number;
  nom: string;
  description: string | null;
  pourcentage: number;         // نسبة الخصم
  date_debut: string;
  date_fin: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}