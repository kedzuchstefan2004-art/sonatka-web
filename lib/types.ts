export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  allergens?: string[];
  category?: string;
}

export interface DailyMenu {
  date: string;
  items: MenuItem[];
  price: number;
  servingTime: string;
}

export interface PermanentMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  allergens?: string[];
  category: string;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  city: string;
  phone: string[];
  email: string;
  openingHours: {
    [key: string]: string;
  };
  capacity: {
    restaurant: number;
    smokingLounge: number;
    terrace: number;
  };
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  numberOfPeople: number;
  occasion: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  active: boolean;
  imageUrl?: string;
}
