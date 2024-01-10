var empDataArray= [];
var empHtmlString;
var dupEmail = []

$("#empFormSubmit").click(a=>{
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();
    var pwd = $("#pwd").val();

    var empData = {
      fname:fname,
      lname:lname,
      email:email,
      pass:pwd 
     }
    fname==""||lname==""||email==""||pwd==""?error():onSubmit(empData);
     });
   
    $('body').on('click','.btn-danger',function(){
      Swal.fire({
          title: "Are you sure?",
          text: "Data will be deleted parmanently",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
        var Id=$(this).attr('id')
        empDataArray= empDataArray.filter(a=>a.email !== Id);
        dupEmail=dupEmail.filter(a=>a.email==Id);
        console.log(Id)
        randerTable();
          Swal.fire({
            title: "Deleted!",
            text: "Your data has been delet.",
            icon: "success"
          });
        }
      });
      
    });
  





    function clearField() {
    $("#fname").val("");
    $("#lname").val("");
    $("#email").val("");
    $("#pwd").val("");
  }


  function randerTable(){
      var empHtmlString="";
      empDataArray.forEach(a=>{
        // var password= a.pass;
        // var secret = "12chishu23";
        // var enc = CryptoJS.AES.encrypt(password, secret).toString(); 
        // alert(enc);
        // var bytes = CryptoJS.AES.decrypt(enc, secret); 
        // alert(bytes.toString(CryptoJS.enc.Utf8));


        empHtmlString += "<tr>"
        empHtmlString += `<td>${a.fname}</td>`
        empHtmlString += `<td>${a.lname}</td>`
        empHtmlString +=`<td>${a.email}</td>`
        empHtmlString += `<td>${CryptoJS.AES.encrypt(a.pass, '12chishu23').toString()}</td>`
        empHtmlString += `<td><button id="${a.email}" class="fa fa-trash-o btn btn-danger btn-lg"></button></td>`
        empHtmlString += "</tr>"
    })
    $("#empData").html(empHtmlString);
  }
  
 
  
  function onSubmit(empData){
      var emailerror =/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/;
    if(dupEmail.indexOf(empData.email)!==-1)
    {
      Swal.fire({
        icon: "error",
        title: "Opps.....",
        text: "Email is alreay Exist",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
    }
    else{
      dupEmail.push(empData.email)
    }
      if(emailerror.test(empData.email))
     {
       empDataArray.push(empData);
        console.log(empDataArray);
        clearField();
        Swal.fire({
          title: "Add successfully!",
          text: "Data has been submitted",
          icon: "success"
        });
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Oops...Invalid Email",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
        randerTable();
        
      }  
    function error(){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are mandatory",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  
