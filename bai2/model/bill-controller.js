export async function getBill(){
    let datas= await firebase.firestore().collection('DSKV').get();
    console.log(datas.docs[0].data().datra);
    document.getElementById("bill-form");
}