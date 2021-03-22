let router=new Navigo(null,true);
let $app=document.getElementById("app");

router.on('/homepage',function(){
    $app.innerHTML='<show-form></show-form>';
}).resolve();
router.on('/chovay',function(){
    $app.innerHTML='<cho-vay-form></cho-vay-form>';
}).resolve();

window.router=router;