// eslint-disable-next-line no-use-before-define
import React, {useState, useEffect, useReducer, useRef} from 'react';
import {
  View,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import RNCameraRoll from '@react-native-community/cameraroll';
import {StyleSheet} from 'react-native';


const initialState = {
  assets: [],
  data: [],
  seen: new Set(),
  lastCursor: null,
  noMore: false,
  loadingMore: false,
};

const groupByEveryN = function groupByEveryN(num) {
  const n = num;
  return (arrayArg) => {
    const array = [...arrayArg];
    const result = [];
    while (array.length > 0) {
      const groupByNumber = array.length >= n ? n : array.length;
      result.push(array.splice(0, groupByNumber));
    }
    return result;
  };
};

const NUM_COLUMNS = 3;

const CameraRoll = ({
  batchSize,
  groupTypes,
  assetType,
  imagesPerRow,
  bigImages,
  headerTitle,
  onSelectImage,
}) => {
  const window = useRef(Dimensions.get('screen')).current;

  const IMAGE_SIZE = (window.width - 10) / NUM_COLUMNS - 10;

  const [state, setState] = useState(initialState);

  const {assets = [], data = [], seen, lastCursor, noMore, loadingMore} = state;

  useEffect(() => {
    setTimeout(() => {
      fetchImages();
    }, 250);
  }, []);

  const _onEndReached = () => {
    if (!noMore) {
      fetchImages();
    }
  };

  const _appendAssets = (oldData, isLoadingMore) => {
    const newAssets = oldData.edges;
    const newState = {loadingMore: false};

    if (!oldData.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (newAssets.length > 0) {
      newState.lastCursor = oldData.page_info.end_cursor;
      newState.seen = new Set(seen);

      // Unique assets efficiently
      // Checks new pages against seen objects
      const uniqAssets = [];
      for (let index = 0; index < newAssets.length; index += 1) {
        const asset = newAssets[index];
        const value = asset.node.image.uri;
        console.log("uri",value)
        if (!newState.seen.has(value)) {
          newState.seen.add(value);
          uniqAssets.push(asset);
        }
      }

      newState.assets = assets.concat(uniqAssets);
      // newState.data = groupByEveryN(imagesPerRow)(newState.assets);
      newState.data = newState.assets;
      newState.loadingMore = isLoadingMore;
    }

    setState(newState);
  };

  const fetchImages = (clear) => {
    if (!loadingMore) {
      _fetch(clear, !loadingMore);
    }
  };

  const _fetch = async (clear) => {
    if (clear) {
      setState(initialState);
      fetchImages();
      return;
    }

    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'RNTester would like to access your pictures.',
        }
      );
      if (result !== 'granted') {
        Alert.alert('Access to pictures was denied.');
        return;
      }
    }

    const fetchParams = {
      first: batchSize,
      groupTypes,
      assetType,
    };
    if (Platform.OS === 'android') {
      // not supported in android
      delete fetchParams.groupTypes;
    }

    if (lastCursor) {
      fetchParams.after = lastCursor;
    }

    try {
      const newData = await RNCameraRoll.getPhotos(fetchParams);
      console.log(newData);
      _appendAssets(newData);
    } catch (e) {
      console.error(e);
    }
  };

  const _renderFooterSpinner = () => {
    if (!state.noMore) {
      return <ActivityIndicator color='#E10600' />;
    }
    return null;
  };

  const onPressItem = (asset) => {
    onSelectImage(asset);
  };

  const _renderItem = ({item = []}) => (
    <TouchableOpacity
      onPress={() => onPressItem(item)}
      style={CameraRollStyles.row}>
        {console.log("node",item.node.image)}
      <Image
        source={item.node.image}
        style={[
          CameraRollStyles.image,
          {
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
          },
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={CameraRollStyles.container}>
      <Text style={CameraRollStyles.headerTitle}>{headerTitle}</Text>
      <FlatList
        keyExtractor={(_, idx) => String(idx)}
        numColumns={NUM_COLUMNS}
        renderItem={_renderItem}
        ListFooterComponent={_renderFooterSpinner}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.2}
        style={CameraRollStyles.flatList}
        data={data}
        extraData={bigImages + noMore}
      />
    </View>
  );
};

CameraRoll.propTypes = {
  onSelectImage: PropTypes.func,
  groupTypes: PropTypes.oneOf(['All']),
  batchSize: PropTypes.number,
  imagesPerRow: PropTypes.number,
  assetType: PropTypes.oneOf(['Photos']),
  headerTitle: PropTypes.string,
};

CameraRoll.defaultProps = {
  groupTypes: 'All',
  batchSize: 5,
  imagesPerRow: 1,
  assetType: 'Photos',
  headerTitle: 'ŞƏKİL SEÇİMİ',
  onSelectImage: (asset) => {},
};

const CameraRollStyles = StyleSheet.create({
  row: {
    borderRadius: 10,
    overflow: 'hidden',
    margin: 3,
  },
  image: {flex:1/3},
  container: {
    flex: 1,
    justifyContent:'center'
  },
  flatList: {
    flex: 1,
    margin:5
  },
  headerTitle: {
    fontSize: 15,
    marginLeft: 15,
    fontWeight: 'bold',
    marginVertical: 20,
    color:'#E10600'
  },
});



export default CameraRoll;
