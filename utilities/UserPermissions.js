import Constans from 'expo-constants'
import * as Permissions from 'expo-permissions'
// import { getCameraPermissionsAsync } from 'expo-image-picker'

class UserPermissions {
    getCameraPermission = async () => {
        if(Constans.platform.android) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if(status != 'granted') {
                alert('We need permission to your camera roll')
            }
        }
    }
}

export default new UserPermissions()
