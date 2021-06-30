import seaport from '../components/seaport';

async function fetchAssets(OpenSeaAssetQuery){
    const OpenSeaAssets = await seaport.api.getAssets(OpenSeaAssetQuery);
    return OpenSeaAssets;
}

export default fetchAssets;