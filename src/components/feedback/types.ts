export interface FeedbackProps {
  userName?: string;
  points?: number;
  walletBalance?: number;
  orderDetails?: OrderDetails;
  onSubmit?: (data: FeedbackData) => void;
}

export interface OrderDetails {
  amount: number;
  date: string;
  orderId: string;
  items?: OrderItem[];
}

export interface OrderItem {
  name: string;
  price: number;
}

export interface FeedbackData {
  rating: number;
  comment: string;
}

export interface DesignProps extends FeedbackProps {
  variant?: 'modern' | 'playful' | 'corporate';
} 