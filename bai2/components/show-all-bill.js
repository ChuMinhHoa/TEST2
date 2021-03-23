const $template=document.createElement('template');
$template.innerHTML =/*html*/`
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
<div class="form-group" style="margin-top:30px">

<form id="bill-form" class="" style="background-color: whitesmoke;">
    <p id='id' style="display:none;">
    <p id="name">Ho va ten</p>
    <p style="display:inline-block;">So tien vay: <p style="display:inline-block;" id="money">So tien vay</p></p>
    <p id="mucdich">Muc dich vay</p>
    <p id="date">Ngay hen tra</p>
    <p id="redate">Ngay tra</p>
    <button id="datra" style="display:none;" class="btn btn-primary">Da tra</button>
</form>
</div>
`;

export default class Showbill extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$name =this.shadowRoot.getElementById("name");
        this.$money =this.shadowRoot.getElementById("money");
        this.$mucdich =this.shadowRoot.getElementById("mucdich");
        this.$date =this.shadowRoot.getElementById("date");
        this.$redate =this.shadowRoot.getElementById("redate");
        this.$datra =this.shadowRoot.getElementById("datra");
        this.$id =this.shadowRoot.getElementById("id");

        this.$bill_form=this.shadowRoot.getElementById("bill-form");
    }
    static get observedAttributes(){
        return ['id','name','money','mucdich','date','redate','datra'];
    }
    attributeChangedCallback(attrName, oldValue, newValue){
        if (attrName=="name") {
            this.$name.innerHTML="Ten người vay: "+newValue;
        }else if (attrName=="money") {
            this.$money.innerHTML=newValue;
        }else if (attrName=="mucdich") {
            this.$mucdich.innerHTML="Muc dich vay: "+newValue;
        }else if (attrName=="date") {
            this.$date.innerHTML="Ngày hẹn tra: "+newValue;
        }
        else if (attrName=="datra") {
            if (newValue=='false') {
                this.$datra.style="display:block;"
            }else{
                this.$datra.style="display:none;"
            }
        }else if(attrName=="redate"){
            if (newValue!="") {
                this.$redate.innerHTML = "Ngay tra: "+newValue;
            }else{
                this.$redate.style="display:none";
            }
        }else if (attrName=="id") {
            this.$id.innerHTML=newValue;
        }
    }
    connectedCallback(){
        this.$bill_form.onsubmit=(event)=>{
            let id=this.$id.innerHTML;
            let datra=true;
            let sotien=parseInt(this.$money.innerHTML);
            this.changeDatra(id,datra,sotien);
            alert(this.$name.innerHTML+" da tra tien");
        }
    }

    async changeDatra(id,_datra,_sotien){

        let d= new Date;
        let str=d.getDate().toString()+"/"+(d.getMonth()+1).toString()+"/"+d.getFullYear().toString();
        

        let tk=await firebase.firestore().collection("TK").get();
        let idTK=tk.docs[0].id;
        tk=tk.docs[0].data().taikhoan;

        await firebase.firestore().collection("DSKV").doc(id).update({'datra':_datra,'redate':str});
        await firebase.firestore().collection("TK").doc(idTK).update({'taikhoan':tk+_sotien});

        router.navigate('/homepage')

    }
}
window.customElements.define('show-bill',Showbill)