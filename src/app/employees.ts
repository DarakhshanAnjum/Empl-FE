export class Employees {
  forEach(arg0: (value: any, key: any) => void) {
    throw new Error('Method not implemented.');
  }
  employeeId: string="";
  firstName: string="";
  lastName: string="";
  dateofBirth: Date | null = null; // Use Date type for dates;
  email: string="";
  phoneNumber: string="";
  jobTitle: string="";
  dateofJoining: Date | null = null; // Use Date type for dates;
  employementType: string="";
  employementStatus: string="";
  photo: File | undefined;
  identityProof: File | undefined;
  location: string="";
  country: string="";

}
