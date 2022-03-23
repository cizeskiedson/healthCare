import { PermissionsAndroid, Platform } from 'react-native'
import { BleManager } from 'react-native-ble-plx'
import { Buffer } from 'buffer'
export const manager = new BleManager()

export const requestScanPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ).then(result => {
      if (result) {
        console.log('Permission is OK')
        scan()
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ).then(result => {
          if (result) {
            console.log('User accept')
            scan()
          } else {
            console.log('User refuse')
          }
        })
      }
    })
  }
}
const scan = () => {
  const base64Str = Buffer.from('1', 'utf8').toString('base64')
  console.log('manager created')
  manager.startDeviceScan(
    ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'],
    null,
    (error, device) => {
      if (error) {
        console.log(error)
      }
      console.log(device?.name)
      if (device?.name === 'ESP32') {
        console.log('encontrou ESP32')
        manager.stopDeviceScan()
        console.log('parou o scan')

        device
          .connect()
          .then(device => {
            console.log('conectou')
            return device.discoverAllServicesAndCharacteristics()
          })
          .then(device => {
            // Do work on device with services and characteristics
            console.log('enviou a mensagem')
            device.writeCharacteristicWithResponseForService(
              '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
              'beb5483e-36e1-4688-b7f5-ea07361b26a8',
              base64Str
            )
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  )
}
