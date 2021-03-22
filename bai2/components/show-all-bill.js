const $template=document.createElement('template');
$template.innerHTML =/*html*/`
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
<div class="form-group">
<p>danh sach khoan vay</p>
<div>
    <p>Ho va ten</p>
    <p>So tien vay</p>
    <p>Muc dich vay</p>
    <p>Ngay hen tra</p>
    <p>Ngay tra</p>
</div>
</div>
`;

export default class Showbill extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
    }
    
}
window.customElements.define('show-bill',Showbill)