import {
  IAssistanceSubType,
  IAssistanceType,
} from '../data/assistanceTypesData';

export interface IRequest {
  id: number | string;
  requesterDetails: {
    requesterName: string;
    phone?: string;
    district?: string;
    city?: string;
    street?: string;
  };
  requestDetails: {
    requestName: string;
    requestType: IAssistanceType['label'];
    requestSubType?: IAssistanceSubType['label'][];
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
