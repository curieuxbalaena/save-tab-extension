const inputBtn = document.getElementById("input-btn")
const clearBtn = document.getElementById("clear-btn")
const tabBtn = document.getElementById("tab-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.querySelector("#ul-el")
let myLeads = []
let leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))


if(leadsFromStorage){
    myLeads = leadsFromStorage
    render(myLeads)
}

inputBtn.addEventListener("click", function() {

    if(inputEl.value){
        myLeads.push(inputEl.value)
        inputEl.value = ""  
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
    
    /*for (let i = 0; i< myLeads.length; i++){
        console.log("myLeads = " + myLeads[i])
        ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
        //const li = document.createElement("li")
        //li.textContent = myLeads[i]
        //ulEl.append(li)
        
    }*/
      
})

tabBtn.addEventListener("click", function() {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
      });

    
})

clearBtn.addEventListener("dblclick", function() {

    localStorage.clear()
    myLeads = []
    ulEl.innerHTML = ""
      
})

function render(lead){

    let listItems = ""

for (let i = 0; i<lead.length; i++) {

    listItems += `
    
    <li>
        <a target='_blank' href='${myLeads[i]}'>
            
            ${myLeads[i]}

        </a>
    </li>`

    console.log(listItems)
    ulEl.innerHTML = listItems
}
    
}
