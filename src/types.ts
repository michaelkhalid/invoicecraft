export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyLogo: string; // Base64 or object URL
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  currency: string;
  country: string;
  items: InvoiceItem[];
  taxRate: number; // percentage
  discountRate: number; // percentage
  shippingFee: number;
  notes: string;
  paymentTerms: string;
  bankName: string;
  bankAccount: string;
  paymentStatus: 'Unpaid' | 'Paid' | 'Overdue';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Markdown or structured sections
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
