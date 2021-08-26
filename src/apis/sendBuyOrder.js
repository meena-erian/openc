import seaport from '../components/seaport';

export default async function sendBuyOrder(asset, accountAddress, startAmount){
    const offer = await seaport.createBuyOrder({
        asset,
        accountAddress,
        startAmount
    });
    return { offer : offer};
}
