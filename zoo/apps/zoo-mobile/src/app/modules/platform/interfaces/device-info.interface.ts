export interface IDeviceInfo {

    /**
     * UUID устройства
     * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/#deviceuuid
     */
    deviceId: string;

    /**
     * Имя производителя устройства (manufacturer)
     * https://capacitorjs.com/docs/apis/device#deviceinfo
     * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/#devicemanufacturer
     */
    deviceName?: string;
    /**
     * Устройство пользователя имеет права рута или jailbraked
     */
    jailbrake?: boolean;

    /**
     * Название ОС
     * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/#deviceversion
     */
    os?: string;

    /**
     * Название модели устройства
     * https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/#devicemodel
     */
    model?: string;

    /**
     * imei устройства (только для Android)
     */
    imei?: string;

    /**
     * Серийный номер устройства
     */
    serial?: string;

    /**
    * Android: Returns a random 64-bit integer (as a string, again!)
    *          The integer is generated on the device's first boot
    *
    * BlackBerry: Returns the PIN number of the device
    *             This is a nine-digit unique integer (as a string, though!)
    *
    * iPhone: (Paraphrased from the UIDevice Class documentation)
    *         Returns the [UIDevice identifierForVendor] UUID which is unique and the same for all apps installed by the same vendor. However the UUID can be different if the user deletes all apps from the vendor and then reinstalls it.
    * Windows Phone 7 : Returns a hash of device+current user,
    * if the user is not defined, a guid is generated and will persist until the app is uninstalled
    * Tizen: returns the device IMEI (International Mobile Equipment Identity or IMEI is a number
    * unique to every GSM and UMTS mobile phone.
    */
    uuid?: string;
}
