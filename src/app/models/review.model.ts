export interface Review {
  id: number;
  user_id: number;
  article_id: number;
  rating: number;              // 1-5
  comment: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
  };
}

export interface ReviewRequest {
  article_id: number;
  rating: number;
  comment: string;
}