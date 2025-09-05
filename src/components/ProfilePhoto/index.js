import * as React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { Images } from "../../theme";
import styles from "./Styles/index";

function ProfilePhoto(props) {
  const normalizeSource = (source) => {
    if (!source) return undefined;

    if (typeof source === "string") {
      return { uri: source }; // remote URL
    }

    if (typeof source === "object" && source.uri) {
      return { uri: source.uri }; // picker object
    }

    if (typeof source === "number") {
      return source; // require() local image
    }

    return undefined;
  };

  const [imageSource, setImageSource] = React.useState(
    normalizeSource(props?.source)
  );

  // 👇 Update when parent prop changes
  React.useEffect(() => {
    setImageSource(normalizeSource(props?.source));
  }, [props?.source]);

  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 110,
      height: 110,
      cropping: true,
    }).then((image) => {
      const picked = { uri: image.path };
      setImageSource(picked);

      props.onChange({
        uri: image.path,
        name: "profile_image.jpg",
        type: "image/jpeg",
      });
    });
  };

  return (
    <>
      {props.userGallery ? (
        <TouchableOpacity
          style={[
            styles.uploadImageBtn,
            {
              width: 120,
              height: 120,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            },
          ]}
          onPress={pickPicture}
        >
          {imageSource ? (
            <ImageBackground
              style={{ width: "100%", height: "100%" }}
              source={imageSource}
            />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={Images.UpArrowRound}
                style={{ width: 30, height: 30, tintColor: "#aaa" }}
                resizeMode="contain"
              />
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.profileEditContent}>
          <Image
            source={imageSource || Images.UserImage}
            resizeMode="cover"
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.userEditImageBtn}
            onPress={pickPicture}
          >
            <Image
              source={Images.EditIcon}
              resizeMode="contain"
              style={styles.userEditImage}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default ProfilePhoto;
