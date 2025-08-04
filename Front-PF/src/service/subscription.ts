import { ISubscription } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Verificar el estado de la suscripción del usuario
export const checkUserSubscription = async (userId: string, token: string): Promise<ISubscription | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.subscription || null;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return null;
  }
};

// Verificar si el usuario tiene acceso activo
export const hasActiveSubscription = (subscription: ISubscription | null): boolean => {
  if (!subscription) {
    console.log('🔍 hasActiveSubscription: No hay suscripción');
    return false;
  }
  
  const now = new Date();
  const endDate = new Date(subscription.endDate);
  
  const isActive = subscription.isActive && subscription.status === 'active' && endDate > now;
  
  console.log('🔍 hasActiveSubscription Debug:', {
    subscription: subscription,
    isActive: subscription.isActive,
    status: subscription.status,
    endDate: endDate,
    now: now,
    endDateAfterNow: endDate > now,
    result: isActive
  });
  
  return isActive;
};

// Obtener información del plan actual
export const getCurrentPlanInfo = (subscription: ISubscription | null) => {
  if (!subscription) {
    return {
      hasAccess: false,
      planType: 'none',
      daysRemaining: 0,
      isExpired: true,
      message: 'Sin suscripción activa'
    };
  }

  const now = new Date();
  const endDate = new Date(subscription.endDate);
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isExpired = endDate <= now;

  return {
    hasAccess: hasActiveSubscription(subscription),
    planType: subscription.planType,
    daysRemaining: Math.max(0, daysRemaining),
    isExpired,
    message: isExpired 
      ? 'Suscripción expirada' 
      : daysRemaining <= 7 
        ? `Expira en ${daysRemaining} días` 
        : 'Suscripción activa'
  };
}; 