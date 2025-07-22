export interface Member {
  id: string;
  microfinance_id: string;
  first_name: string;
  last_name: string;
  id_number: string;
  phone: string;
  email: string;
  address: string;
  status: 'Pending' | 'Active';
  created_at: string;
  updated_at: string;
  microfinance?: {
    id: string;
    name: string;
  };
  full_name?: string;
}

export interface CreateMemberRequest {
  microfinance_id: string;
  first_name: string;
  last_name: string;
  id_number: string;
  phone: string;
  email: string;
  address: string;
}

export interface ActivateMemberRequest {
  member_id: string;
}
