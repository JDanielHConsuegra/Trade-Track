//user

export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUserRegister {
    username: string;
    email: string;
    password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  isActive: boolean;
  trips?: ITrip[]; // O ITrip[] si ya lo definiste así
  Image_Profile?: string | File
  created_at: Date;
  updated_at: Date;
  subscription?: ISubscription;
}

export interface ISubscription {
  id: string;
  userId: string;
  planType: 'welcome' | 'monthly' | 'quarterly' | 'lifetime';
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  mpSubscriptionId?: string;
  created_at: Date;
  updated_at: Date;
}

// DTO para crear suscripción
export interface CreateSubscriptionDto {
  payer_email: string;
  frequency: number;
  frequency_type: string;
  transaction_amount: number;
  user_id: string;
  planType: 'welcome' | 'monthly' | 'quarterly' | 'lifetime';
}

export interface UserProfile {
  nombre: string | undefined;
  email: string | undefined;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  monthlyReports: boolean;
}

//producto
export interface CreateProduct {
  categoryMaster: ProductCategory
  reference: string
  name: string
  price: number
  cuantity: number
  color: string
  height: number
  width: number
  depth: number
  manufacturing_date: Date
  quantity_per_box: number
  total_quantity_per_box: number
  total_quantity: number
  own_packaging: boolean
  state?: ProductState
  desactivated: boolean
  tripId?: string
}


export interface IProduct {
  id?: number
  categoryMaster: ProductCategory
  reference: string
  name: string
  price: number
  cuantity: number
  color: string
  height: number
  width: number
  depth: number
  manufacturing_date: Date
  quantity_per_box: number
  total_quantity_per_box: number
  total_quantity: number
  own_packaging: boolean
  state: ProductState
  desactivated: boolean
  created_at: Date
  updated_at: Date
  tripId?: string
  trip?: ITrip
}

export enum ProductCategory {
  ELECTRODOMESTICOS = 'electrodomesticos',
  TECNOLOGIA = 'tecnologia',
  MUEBLES = 'muebles',
  ROPA = 'ropa',
  JUGUETES = 'juguetes',
  HERRAMIENTAS = 'herramientas',
  HOGAR = 'hogar',
  DEPORTES = 'deportes',
  LIBROS = 'libros',
  BELLEZA = 'belleza',
}

export enum ProductState {
  PENDING = 'pending',
  APPROVED = 'approved',
  CANCELLED = 'cancelled',
}

//proveedor

export interface IProvider {
  id: string
  name: string
  main_picture: string
  wechat_contact?: string
  phone_number: string
  address: string
  city: string
  gps_location?: string
  master_genre?: string
  observation?: string
  created_at: Date
  updated_at: Date
  pictures?: ProviderPicture[]
  is_active: boolean
  trip: ITrip
}

export interface ProviderPicture {
  id: string
  url_foto: string
  order?: number
  created_at: Date
  provider: IProvider
}


export interface CreateProvider {
  name: string
  main_picture?: string
  pictures?: ProviderPicture[]
  wechat_contact: string
  phone_number: string
  address: string
  city: string
  gps_location: string
  master_genre: string
  observation?: string
  tripId?: string
}

//viajes

export interface ICreateTrip {
  name: string
  date: string
  travelers: string[]
  observation?: string
}

export interface ITrip {
  id: string
  name: string
  date: Date
  travelers: string[]
  observation: string
  createdAt: Date
  updatedAt: Date
  user: IUser
  providers: IProvider[]
  products: IProduct[]
}