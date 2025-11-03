
export interface ProductRecommendation {
  name: string;
  url: string;
}

export interface OracleResponse {
  answer_html: string;
  product_recommendations: ProductRecommendation[];
}
