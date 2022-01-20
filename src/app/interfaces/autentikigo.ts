export interface UserInterface {
  personInfo?: {
    birthday: string;
    country: string;
    gender: string;
    mother: string;
    name: string;
    uniqueId: string;
    _id: string;
  };
  companyInfo?: {
    birthday: string;
    cnae: any;
    corporateName: string;
    tradeName: string;
    email: string;
    responsible: string;
    uniqueId: string;
    _id: string;
  }
  userId: string;
}
