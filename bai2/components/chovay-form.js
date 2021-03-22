
const $template=document.createElement('template');
$template.innerHTML=/*html*/`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<form action="" id="cho-vay-form" class="p-3" method="POST">
<h2 class="text-center">Them khoan vay</h2>
<input-wrapper id="name" type="text" placeholder="Ho ten nguoi vay"></input-wrapper>
<input-wrapper id="sotien" type="text" placeholder="So tien vay"></input-wrapper>
<input-wrapper id="ngayhen" type="text" placeholder="Ngay hen tra"></input-wrapper>
<input-wrapper id="mucdich" type="textarea" placeholder="Muc dich vay tien"></input-wrapper>
<button class="btn btn-primary btn-block" style="width:200px">Cho vay</button>
</form>
`;

export default class ChoVayForm extends HTMLElement{

    constructor(){

        super();
        this.attachShadow({mode:'open'});
        
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$form=this.shadowRoot.getElementById("cho-vay-form");


    }

    async connectedCallback(){
        this.$form.onsubmit=(event)=>{
            event.preventDefault();
        }
        
    }

}
window.customElements.define('cho-vay-form',ChoVayForm);