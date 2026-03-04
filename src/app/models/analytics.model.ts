export interface Recommendation {
  article_id: number;
  designation: string;
  prix: number;
  score: number;
  reason: string;
  image?: string;
}

export interface Prediction {
  period: string;
  predicted_sales: number;
  confidence: number;
  top_products: Array<{
    article_id: number;
    designation: string;
    predicted_quantity: number;
  }>;
}

export interface StockAlert {
  article_id: number;
  designation: string;
  quantite: number;
  seuil_alerte: number;
  status: 'warning' | 'critical';
}

export interface SalesReport {
  period: string;
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
  growth_percentage: number;
}