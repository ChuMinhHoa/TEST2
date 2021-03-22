const $template=document.createElement('template');
$template.innerHTML =/*html*/`
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
<div class="form-group" style="margin-top:30px">

<form id="bill-form" class="" style="background-color: whitesmoke;">
    <p id="name">Ho va ten</p>
    <p id="money">So tien vay</p>
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
    }
    static get observedAttributes(){
        return ['name','money','mucdich','date','redate','datra'];
    }
    attributeChangedCallback(attrName, oldValue, newValue){
        if (attrName=="name") {
            this.$name.innerHTML=newValue;
        }else if (attrName=="money") {
            this.$money.innerHTML=newValue;
        }else if (attrName=="mucdich") {
            this.$mucdich.innerHTML=newValue;
        }else if (attrName=="date") {
            this.$date.innerHTML=newValue;
        }
        else if (attrName=="datra") {
            if (newValue=='false') {
                this.$datra.style="display:block;"
            }else{
                this.$datra.style="display:none;"
            }
        }else if(attrName=="redate"){
            if (newValue!="") {
                this.$redate.innerHTML =newValue;
            }else{
                this.$redate.style="display:none";
            }
        }
    }
}
window.customElements.define('show-bill',Showbill)