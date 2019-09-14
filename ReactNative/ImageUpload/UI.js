import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Button, Icon, Image } from 'react-native-elements';

const ProfileScreen = (props) => {
    useEffect(() => {
        getPermissionAsync()
    }, [getPermissionAsync]);

    const [gender, setGender] = useState('f');
    const [image, setImage] = useState(null);

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const _pickImage = async () => {
        const apiUrl = 'http://127.0.0.1:5000/api/uploads';
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });

        const { uri, cancelled } = result;
        if(!cancelled) {
            setImage(uri);
        }

        if(!cancelled) {
            let uriParts = uri.split('.');
            let fileType = uriParts[uriParts.length - 1];

            let formData = new FormData();
            formData.append('photo', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });

            let options = {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            };

            try {
                const data = await fetch(apiUrl, options);
                //const { ok, status } = data; // ok===true, status===204
            } catch(err) {
                console.error(err);
            }
        }
    };

    const savePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({aspect: 1, allowsEditing: true});
        if(!cancelled) setImage(uri);
    };
    const takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({allowsEditing: false});
        if(!cancelled) setImage(uri);
    };

    const uploadImage = e => {
        alert('upload');
    };

    return (
        <Avatar
            rounded
            size={200}
            icon={{name: 'user', type: 'font-awesome'}}
            source={{ uri: image, }}
            activeOpacity={0.7}
            onPress={_pickImage}
        />
    )
};

export default ProfileScreen;
