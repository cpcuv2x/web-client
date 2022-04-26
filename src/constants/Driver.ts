import { DriverGender } from "../interfaces/Driver"

export const fieldLabel = {
  id: "ID",
  firstNameTH: "First Name (Thai)",
  lastNameTH: "Last Name (Thai)",
  firstNameEN: "First Name (Eng)",
  lastNameEN: "Last Name (Eng)",
  gender: "Gender",
  birthDate: "Birth Date",
  nationalId: "National ID",
  carDrivingLicenseId: "Car Driving License No.",
  image: "Image",
  username: "Username",
  password: "Password",
}

export const driverGenderLabel = {
  [DriverGender.MALE]: "Male",
  [DriverGender.FEMALE]: "Female",
  [DriverGender.NOT_SPECIFIED]: "Not Specified",
}
