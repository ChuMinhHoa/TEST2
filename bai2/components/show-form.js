
const $template=document.createElement('template');
$template.innerHTML =/*html*/`
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        <form id="show-forms">
            <div class="d-flex row" style="background-color: whitesmoke;">
                <h5 id="NS" class="col-6"></h5>
                <div class="col-6" style="display: flex; justify-content: flex-end;">
                    <button class="btn btn-primary">Cho vay</button>
                </div>
            </div>
            <p>danh sach khoan vay</p>
            <div id="bills"></div>
            
        </form>
        
`;

export default class ShowForm extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$show_form=this.shadowRoot.getElementById("show-forms");
        this.$NS=this.shadowRoot.getElementById("NS");
        this.$bills=this.shadowRoot.getElementById("bills");
    }
    observedAttributes(){
        return ["NS"];
    }
    attributeChangedCallback(attrName,oldValue,newValue){
        if (attrName=="budget") {
            this.$NS.innerHTML=newValue;
        }
    }
    connectedCallback(){
        this.getTk();
        this.getBill();
        this.$show_form.onsubmit=(event)=>{
            event.preventDefault();
            let buget=parseInt(this.$NS.innerHTML,10);
            if (buget!=0) {
                router.navigate('/chovay')
            }
        };
    }
    async getTk(){
        let tk;
        let response=await firebase.firestore().collection('TK').get();
        for (let doc of response.docs) {
            tk=doc.data();
        }
        this.$NS.innerHTML=tk.taikhoan;
    }
    async getBill(){
        let response= await firebase.firestore().collection('DSKV').get();
        for(let data of response.docs){
            let $bills=document.createElement('show-bill');
            $bills.setAttribute('name',data.data().ten);
            $bills.setAttribute('money',data.data().vay);
            $bills.setAttribute('mucdich',data.data().mucdich);
            $bills.setAttribute('date',data.data().date);
            $bills.setAttribute('redate',data.data().redate);
            $bills.setAttribute('datra',data.data().datra);


            this.$bills.appendChild($bills);
        }
    }
}
window.customElements.define('show-form',ShowForm)