// Extensions APIs incorrectly reference `usb.Device`, which is a Platform Apps only API.
// WebUSB is available in Chrome 61+.
declare namespace usb {
  interface Device {

    /**
     * An opaque ID for the USB device. It remains unchanged until the device is unplugged.
     */
    device: number;

    /**
     * The device vendor ID.
     */
    vendorId: number;

    /**
     * The product ID.
     */
    productId: number;

    /**
     * The device version (bcdDevice field).
     */
    version: number;

    /**
     * The iProduct string read from the device, if available.
     */
    productName: string;

    /**
     * The iManufacturer string read from the device, if available.
     */
    manufacturerName: string;

    /**
     * The iSerialNumber string read from the device, if available.
     */
    serialNumber: string;
  }
}

// The MV3 API `action` incorrectly references the MV2-only API `browserAction`.
declare namespace browserAction {

  /**
   * A tuple of RGBA values.
   */
  type ColorArray = [number, number, number, number];

  /**
   * Pixel data for an image. Must be an ImageData object; for example, from a `canvas` element.
   */
  type ImageDataType = ImageData;

}
