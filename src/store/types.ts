export interface IRequest {
  requestName?: string;
  requestStatus?: "pending" | "in-progress" | "completed";
  createdAt?: number;
  updatedAt?: number;
  district?: string;
  city?: string;
  street?: string | undefined;
  requesterName: string;
  requesterPhone?: string;
  needTransportation?: boolean;
  needVolunteers?: boolean;
  attachment?: string | undefined;
  id?: number | string;
  requestType: string;
  requestSubType?: string[];
  requestDescription?: string;
  requestImage?: string;
  assignedTo?: string[];
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
  name: string;
  email: string;
  password: string;
}

