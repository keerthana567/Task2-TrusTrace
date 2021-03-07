let post = document.getElementById('posts');
let submit = document.getElementById('btn');
let title = document.getElementById('title');
let body = document.getElementById('body');
let userId = document.getElementById('userId');


function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode;
	    if (charCode != 46 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
	    	return false;
	    
	  return true;
}

function validate(){
	
	var msg =true;
	
	
	var title =document.getElementById("title").value;
	var body =document.getElementById("body").value;
	var userId =document.getElementById("userId").value;
	
	if(title=="" || title==null){
		
		msg = false;
		
	}
	
	if(body=="" || body==null){

		msg = false;
		
	}
	
	if(userId=="" || userId==null){
		msg = false;
	}
	if(msg==false){
		alert("Please fill all the field");
	}
	return msg;
	
}


async function posts() {
    await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => json.forEach(i => {
            let div = document.createElement('div')  ///creating a division
            div.classList.add('card');    ////Add Class name=card
            div.setAttribute('data-id', i.id)   ////Add Class  Id
            for (const property in i) {
                if (property !== 'id') {
                    let divsionWrap = document.createElement('div'); ///creating division inside a card
                    let span = document.createElement('span');    ///creating a span
                    let data = document.createElement('data');   ///creating a data 
                    divsionWrap.classList.add(`${property}`);  ////setting a key to this
                    span.innerText = `${property}: `;
                    let str = i[property].toString();      ////setting a value to this
                    str = str.replace(/(\r\n|\n|\r)/gm, "");   //////line brk
                    data.innerText = `${str}`
                    divsionWrap.appendChild(span); // appending
                    divsionWrap.appendChild(data);
                    div.appendChild(divsionWrap);
                }
            }
            let btndiv = document.createElement('div'); ///division for button
            btndiv.classList.add('button');
            let del = document.createElement('button');  ///Delete button
            del.id = 'delete';
            del.innerText = 'Delete';
            let com = document.createElement('button'); ///Comment button
            com.id = 'comment';                                          
            com.innerText = 'Comments';
            btndiv.appendChild(del);
            btndiv.appendChild(com);
            div.appendChild(btndiv)
            post.appendChild(div);/// apending after post
 
        }))

    cardevent();
}


submit.addEventListener('click', async (e) => {

//async function submitPost(){
	if(validate()){
e.preventDefault();


    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
        	userId: userId.value,
        	title: title.value,
            body: body.value,
            
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((i) => {
            let div = document.createElement('div')  ////same as for post method continued
            div.classList.add('card');
            div.setAttribute('data-id', i.id)
            for (const property in i) {
                if (property !== 'id') {
                    let divsionWrap = document.createElement('div');
                    let span = document.createElement('span');
                    let data = document.createElement('data');
                    divsionWrap.classList.add(`${property}`);
                    span.innerText = `${property}: `;
                    let str = i[property].toString();
                    str = str.replace(/(\r\n|\n|\r)/gm, "");  //////line brk
                    data.innerText = `${str}`;
                    divsionWrap.appendChild(span);
                    divsionWrap.appendChild(data);
                    div.appendChild(divsionWrap)
                }
            }
            let btndiv = document.createElement('div');
            btndiv.classList.add('button');
            let del = document.createElement('button');
            del.id = 'delete';
            del.innerText = 'Delete';
            let com = document.createElement('button');
            com.id = 'comment';
            com.innerText = 'Comments';
            btndiv.appendChild(del);
            btndiv.appendChild(com);
            alert
            div.appendChild(btndiv)
            post.appendChild(div);
            div.scrollIntoView();
        })
    title.value = ''  //// to remove value from text box
    body.value = ''
    userId.value = ''
    cardevent()
}

})
//}



function cardevent() {

    let card = document.querySelectorAll('button');
    card.forEach(i => {
        i.addEventListener('click', e => {
            if (e.target.id == 'comment') {

                const tab = window.open(`https://jsonplaceholder.typicode.com/posts/${e.target.parentNode.parentNode.getAttribute("data-id")}/comments`, '_blank');
            }
            else {
                fetch(`https://jsonplaceholder.typicode.com/posts/${e.target.parentNode.parentNode.getAttribute("data-id")}`, {
                    method: 'DELETE',
                });
                e.target.parentNode.parentNode.remove();
            }
        })
    })
}