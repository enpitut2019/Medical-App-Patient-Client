function defObj(){
  return obj = {
            name: $('#name').val(),
            country: $('#country').val(),
            language: $('#language').val(),
            destination: $('#destination').val(),
            work_place: $('#work_place').val(),
            length_of_stay: $('#length_of_stay').val(),
            medical_insurance: buttonClick(document.getElementsByName('yn')),
            method_of_payment: $('#method_of_payment').val(),
            religious_requests: $('#religious_requests').val(),
            emergency_contact: $('#emergency_contact').val(),
            acquaintance: $('#acquaintance').val(),
            others: $('#others').val()
        };
}

function backCheck(){
  const latestObj = localStorage.getItem("datalist");
  console.log("latest: "+ latestObj);
  const nowObj = JSON.stringify(defObj(), undefined, "\t");
  console.log("now: "+nowObj);
  if(latestObj===nowObj){
      //トップ画面に戻る
      popPage1();
  }else{
      var dialog = document.getElementById('my-alert-dialog');
      if (dialog) {
        dialog.show();
      } else {
        ons.createElement('alert-dialog.html', { append: true })
          .then(function(dialog) {
            dialog.show();
          });
      }
  }
}

function saveCancel() {
  hideAlertDialog();
  popPage1();
}
function saveAccept() {
  hideAlertDialog();
  regist();
}

var hideAlertDialog = function() {
  document
    .getElementById('my-alert-dialog')
    .hide();
};

var hideAlertDialog2 = function() {
  document
    .getElementById('my-alert-dialog-init')
    .hide();
};

function check(obj){
  for(let k of Object.keys(obj)) {
    if(k=="length_of_stay"||k=="religious_requests"||k=="acquaintance"||k=="others") {continue;}
    else if(obj[k]==""||obj[k]==null){
      console.log(k);
      return false;
    }
  }
  return true; 
}

function buttonClick(_radio) {
    for(var i = 0; i < _radio.length; i++) {
        if(_radio[i].checked) {
          return _radio[i].value
        }
    }
}

function regist() {
    const obj = defObj();
        if (!check(obj)){
          console.log(obj);
          ons.notification.alert('正しく入力されていない箇所があります');
        }else{
        // JSON化
        var jsonObj = JSON.stringify(obj, undefined, "\t");
        console.log(jsonObj);
        localStorage.setItem("datalist",jsonObj);
        ons.notification.alert('情報を更新しました。');
        //元のページに戻る
        popPage1();
        }
};
