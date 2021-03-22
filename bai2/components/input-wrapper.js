const $template = document.createElement('template');
$template.innerHTML = `
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <div class="form-group">
        <input type="text" id="input" class="form-control" placeholder="input here...">
        <div class="text-danger" id="error"></div>
    </div>
`;
export default class InputWrapper extends HTMLElement {

    constructor() {

        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$input = this.shadowRoot.getElementById("input");
        this.$error = this.shadowRoot.getElementById("error");

    }

    static get observedAttributes() {
        return ['type', 'placeholder', 'error', 'default'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'type':
                this.$input.type = newValue;
                break;
            case 'placeholder':
                this.$input.placeholder = newValue;
                break;
            case 'error':
                this.$error.innerHTML=newValue;
                break;
            case 'default':
                this.$input.value = newValue;
                break;
            default:
                break;
        }
    }
    set error(_message){
        this.setAttribute('error',_message);
    }
    get value(){
        return this.$input.value;
    }
    // condition is a callback function
    validate(condition, _message){
        if (condition(this.value)) {
            this.error="";
            return true;
        }
        else {
            this.error=_message;
            return false;
        }
    }

}

window.customElements.define('input-wrapper', InputWrapper);