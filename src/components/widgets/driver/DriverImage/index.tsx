import { Image } from "antd"
import { CompositionImage, ImageProps } from "antd/lib/image"
import appConfig from "../../../../configuration"

interface Props extends Partial<CompositionImage<ImageProps>> {
  driverId: string
}

const DriverImage = ({ driverId, ...props }: Props) => {
  return (
    <Image
      src={`${appConfig.webServicesURL}api/drivers/${driverId}/image`}
      {...props}
    />
  )
}

export default DriverImage
