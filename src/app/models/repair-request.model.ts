export interface RepairRequest {
  id: number;
  user_id: number;
  article_id: number;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  article?: {
    id: number;
    designation: string;
    reference: string;
  };
}

export interface RepairRequestCreate {
  article_id: number;
  description: string;
}