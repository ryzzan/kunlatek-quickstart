export interface UserInterface {
  userData: {
    person?: {
      birthday: string;
      country: string;
      gender: string;
      mother: string;
      name: string;
      uniqueId: string;
      _id: string;
    };
    company?: {
      birthday: string;
      cnae: any;
      corporateName: string;
      tradeName: string;
      email: string;
      responsible: string;
      uniqueId: string;
      _id: string;
    }
    email: string;
    _id: string;
    permissionGroup: any;
  }
  authToken: string;
  authRefreshToken: string;
}
