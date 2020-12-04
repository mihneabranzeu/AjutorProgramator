//Subjects
const subjects = ["PC", "USO", "Mate1", "Mate2"];

//Populating the Subject selection
var dropdown = document.getElementById("Subject");

subjects.forEach(function(e){
    var option = document.createElement("option");
    option.innerText = e;
    dropdown.append(option); 
})


var btn = document.getElementById("Incarca");
btn.addEventListener("click", function()
{
    //Get selected subject
    var sel = document.getElementById("Subject");
    var text= sel.options[sel.selectedIndex].text;

    //Get project title
    var inputTitle = document.getElementById("title");
    var title = inputTitle.value;

    //Input verification
    if(text != "Alege Materia" && title != "") {
        //Adding to list
        var  ul = document.getElementById("list");
        var li = document.createElement('li');
        li.className = "list-group-item";
        var h5title = document.createElement('h5');
        h5title.innerText = title;
        li.append(h5title);
        //Adding to localstorage
        if(localStorage.getItem('dataTitle') == null) {
            localStorage.setItem('dataTitle', '[]');
        }
        if(localStorage.getItem('dataSubject') == null) {
            localStorage.setItem('dataSubject', '[]');
        }
        var old_dataTitle = JSON.parse(localStorage.getItem('dataTitle'));
        var old_dataSubject = JSON.parse(localStorage.getItem('dataSubject'));
        old_dataSubject.push(text);
        old_dataTitle.push(title);
        
        localStorage.setItem('dataTitle', JSON.stringify(old_dataTitle));
        localStorage.setItem('dataSubject', JSON.stringify(old_dataSubject));

         

        var h5subject = document.createElement('h5');
        h5subject.innerText ='(' + text + ')';
        h5subject.style.color = "#92E3A9";
        li.append(h5subject);
        //Delete Button
        var deletebtn = document.createElement('button');
        deletebtn.className="btn d-inline";
        deletebtn.innerText="Sterge";
        deletebtn.onclick = function(){
            deletebtn.parentElement.remove()
            old_dataTitle = JSON.parse(localStorage.getItem('dataTitle'));
            old_dataSubject = JSON.parse(localStorage.getItem('dataSubject'));
            index = old_dataTitle.indexOf(title);
            old_dataSubject.splice(index,1);
            localStorage.setItem('dataSubject', JSON.stringify(old_dataSubject));
            old_dataTitle.splice(index,1);
            localStorage.setItem('dataTitle', JSON.stringify(old_dataTitle));
            return;
        };
        li.append(deletebtn);
        ul.append(li);
    }
       
    else {
        //Display alert
        $(".alert").show();
    } 


})

//FORM 
var send = document.getElementById("send");
send.addEventListener("click", function() {
    var inputname = document.getElementById("name");
    var name = inputname.value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    sendEmail(name, email, message);

});

//Send Email Info
function sendEmail(name, email, message) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "ajutorprogramator@gmail.com",
        Password: "LSACIT2020",
        To: "ajutorprogramator@gmail.com",
        From: "ajutorprogramator@gmail.com",
        Subject: `${name} sent you a message`,
        Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`
    }).then((message) => alert("Mesajul a fost trimis."));
}

//Display list items
var cumparbtn = document.getElementById("Vreausacumparbtn");
cumparbtn.addEventListener('click', function(){
    if(localStorage.getItem('dataTitle') != null && localStorage.getItem('dataSubject') != null) {
        var displayTitle = JSON.parse(localStorage.getItem('dataTitle'));
        var displaySubject = JSON.parse(localStorage.getItem('dataSubject'));
        displayTitle.forEach(function(item, index){
            var  ul = document.getElementById("list");
            //Display list of stored items
            var li = document.createElement('li');
            li.className = "list-group-item";
            var h5title = document.createElement('h5');
            h5title.innerText = item;
            var title = item;
            li.append(h5title);

            var h5subject = document.createElement('h5');
            h5subject.innerText ='(' + displaySubject[index] + ')';
            h5subject.style.color = "#92E3A9";
            li.append(h5subject);

             //Delete Button
            var deletebtn = document.createElement('button');
            deletebtn.className="btn d-inline";
            deletebtn.innerText="Sterge";
            deletebtn.onclick = function(){
                deletebtn.parentElement.remove()
                var old_dataTitle = JSON.parse(localStorage.getItem('dataTitle'));
                var old_dataSubject = JSON.parse(localStorage.getItem('dataSubject'));
                var index = displayTitle.indexOf(title); 
                old_dataSubject.splice(index, 1);
                localStorage.setItem('dataSubject', JSON.stringify(old_dataSubject));
                old_dataTitle.splice(index, 1);
                localStorage.setItem('dataTitle', JSON.stringify(old_dataTitle));
                return;
            };
            li.append(deletebtn);
            ul.append(li);
        });
    }
});

    






