import { Image } from "antd"
import { CompositionImage, ImageProps } from "antd/lib/image"
import appConfig from "../../../../configuration"

interface Props extends Partial<CompositionImage<ImageProps>> {
  carId: string
}

const CarImage = ({ carId, ...props }: Props) => {
  return (
    <Image
      src={`${appConfig.webServicesURL}api/cars/${carId}/image`}
      {...props}
    />
  )
}

export default CarImage
