export async function getBill(){
    let datas= await firebase.firestore().collection('DSKV').get();
}