import { CameraRole } from "../interfaces/Camera"

export const fieldLabel = {
  id: "ID",
  name: "Name",
  description: "Description",
  // streamUrl: "Stream URL",
  role: "Position",
  status: "Status",
  carId: "Attached to car",
  Car: "Car",
}

export const cameraPositionLabel = {
  [CameraRole.DOOR]: "Door",
  [CameraRole.SEATS_FRONT]: "Front",
  [CameraRole.SEATS_BACK]: "Back",
  [CameraRole.DRIVER]: "Driver",
}
