
const $template=document.createElement('template');
$template.innerHTML=/*html*/`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<form action="" id="cho-vay-form" class="p-3" method="POST">
<h2 class="text-center">Them khoan vay</h2>
<input-wrapper id="name" type="text" placeholder="Ho ten nguoi vay"></input-wrapper>
<input-wrapper id="sotien" type="text" placeholder="So tien vay"></input-wrapper>
<input-wrapper id="ngayhen" type="text" placeholder="Ngay hen tra"></input-wrapper>
<textarea id="mucdich" type="textarea" placeholder="Muc dich vay tien" style="width:100%; height:200px;"></textarea>
<button class="btn btn-primary btn-block" style="width:200px">Cho vay</button>
</form>
`;

export default class ChoVayForm extends HTMLElement{

    constructor(){

        super();
        this.attachShadow({mode:'open'});
        
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$form=this.shadowRoot.getElementById("cho-vay-form");
        this.$name=this.shadowRoot.getElementById("name");
        this.$sotien=this.shadowRoot.getElementById("sotien");
        this.$ngayhen=this.shadowRoot.getElementById("ngayhen");
        this.$mucdich=this.shadowRoot.getElementById("mucdich");

    }

    connectedCallback(){
        this.$form.onsubmit=(event)=>{
            event.preventDefault();
            let name=this.$name.value;
            let ngayhen=this.$ngayhen.value;
            let sotien=this.$sotien.value;
            let mucdich=this.$mucdich.value;

            this.chovay(name,sotien,ngayhen,mucdich);
        }
        
    }

    async chovay(_name,_sotien,_ngayhen,_mucdich){
        let tk=await firebase.firestore().collection("TK").get();
        let idTK=tk.docs[0].id;
        tk=tk.docs[0].data().taikhoan;
        _sotien=parseInt(_sotien,10);

        if(tk-_sotien<=0){
            alert("Khong du tai khoan de cho vay "+_sotien);
            router.navigate('/chovay')
        }else{

            await firebase.firestore().collection("DSKV").add({
                ten: _name,
                date: _ngayhen,
                datra: false,
                redate: "",
                mucdich: _mucdich,
                vay: _sotien
            });

            await firebase.firestore().collection("TK").doc(idTK).update({'taikhoan':tk-_sotien});

            alert("vay tien thanh cong");
        }
    }

}
window.customElements.define('cho-vay-form',ChoVayForm);