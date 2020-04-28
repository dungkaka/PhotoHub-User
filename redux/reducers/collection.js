import { COLLECTION } from "../../constant/constant";

const initState = () => {
  return {
    getFirst: false,
    error: null,
    collections: [],
  };
};

export default (state = initState(), { type, payload }) => {
  switch (type) {
    case COLLECTION.GET_LIST_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: payload.collections,
        error: null,
        getFirst: true,
      };

    case COLLECTION.GET_LIST_COLLECTION_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    case COLLECTION.CREATE_COLLECTION_SUCCESS:
      return {
        ...state,
        error: null,
        collections: [...state.collections, payload.collection],
      };

    case COLLECTION.CREATE_COLLECTION_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    case COLLECTION.DELETE_COLLECTION_SUCCESS:
      const collectionAfterDel = state.collections.filter(
        (collection) =>
          collection.collection_id != payload.collection.collection_id
      );
      return {
        ...state,
        error: null,
        collections: collectionAfterDel,
      };

    case COLLECTION.DELETE_COLLECTION_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    case COLLECTION.UPDATE_COLLECTION_INFOR_SUCCESS:
      state.collections.forEach((collection, index) => {
        if (collection.collection_id == payload.collection_id) {
          state.collections[index] = { ...collection, ...payload.inforUpdate };
          // for (let feild in payload.inforUpdate) {
          //   console.log("NAME", collection[feild]);
          //   collection[feild] = payload.inforUpdate[feild];
        }
      });

      // console.log(state.collections);

      return {
        ...state,
        error: null,
      };

    case COLLECTION.UPDATE_COLLECTION_INFOR_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    case COLLECTION.ADD_IMAGE_TO_COLLECTION_SUCCESS:
      // const remainAdd = state.collections.filter(
      //   (item) => item.collection_id != payload.collection_id
      // );
      // const collectionAdd = state.collections.filter(
      //   (item) => item.collection_id == payload.collection_id
      // );

      // collectionAdd[0].images_snippet.push({
      //   ...payload.image,
      //   image_id: payload.image.id,
      // });

      for (let collection of state.collections) {
        if (collection.collection_id == payload.collection_id) {
          collection.images_snippet.push({
            ...payload.image,
            image_id: payload.image.id,
          });
        }
      }

      return {
        ...state,
        error: null,
      };

    case COLLECTION.ADD_IMAGE_TO_COLLECTION_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    case COLLECTION.DELETE_IMAGE_FROM_COLLECTION_SUCCESS:
      // const remainDelete = state.collections.filter(
      //   (item) => item.collection_id != payload.collection_id
      // );
      // const collectionDelete = state.collections.filter(
      //   (item) => item.collection_id == payload.collection_id
      // );
      // const imageSnippetAfterDelete = collectionDelete[0].images_snippet.filter(
      //   (item) => item.image_id != payload.image.id
      // );

      // const collectionAfterDelete = {
      //   ...collectionDelete[0],
      //   images_snippet: imageSnippetAfterDelete,
      // };

      for (let collection of state.collections) {
        if (collection.collection_id == payload.collection_id) {
          const newImageSnippet = collection.images_snippet.filter(
            (item) => item.image_id != payload.image.id
          );
          collection.images_snippet = newImageSnippet;
        }
      }

      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
