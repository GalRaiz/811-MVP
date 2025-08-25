// Simplified interfaces that match our current usage pattern
export interface ISimpleDistrict {
  id: string;
  label: string;
  name: string;
}

export interface ISimpleCity {
  id: string;
  label: string;
  name: string;
}

export interface ISimpleAssistanceType {
  id: string;
  label: string;
  name: string;
  icon: string;
}

export interface ISimpleAssistanceSubType {
  id: string;
  label: string;
  name: string;
  icon?: string;
}

export interface IRequest {
  id: number | string;
  requesterDetails: {
    requesterName: string;
    phone?: string;
    district?: ISimpleDistrict;
    city?: ISimpleCity;
    street?: string;
  };
  requestDetails: {
    requestName: string;
    requestType: ISimpleAssistanceType;
    requestSubType?: ISimpleAssistanceSubType[];
    requestDescription?: string;
    requestImage?: string;
    needTransportation?: boolean;
    needVolunteers?: boolean;
    attachment?: string | undefined;
  };
  requestStatus: {
    requestStatus?: 'pending' | 'in-progress' | 'completed';
    createdAt?: number;
    updatedAt?: number;
    assignedTo?: string[];
  };
}

export interface IRequestsState {
  requestsData: IRequest[];
  loading?: boolean;
  error?: string | null;
}
export interface RootState {
  requests: IRequestsState;
}

export interface IUserData {
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
}
