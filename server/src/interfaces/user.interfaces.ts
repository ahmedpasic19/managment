export default interface IUser {
  email: string
  firstName: string
  lastName: string
  password: string
  userType: string
  phoneNumber: Number
  accessToken: string
  refreshToken: string
}
export interface ISelectedUser extends IUser {
  _id: string
}
