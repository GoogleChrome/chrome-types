/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// These are stubs for DOM APIs not nessecarily available in TS' defaults.
interface Entry {}
interface DirectoryEntry extends Entry {}
interface LocalMediaStream {}

// This is incorrectly marked nodoc in declarative_content.json.
// When it is made visible, the deeper type definition will take precedence.
type ShowAction = void;

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