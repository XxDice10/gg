window.addEventListener('load', function() {
    let pageOn:any = document.getElementById('page-on');
    let pageOnValue:string = pageOn.value;

    let current_on:any = document.getElementById(pageOnValue);

    current_on.style.borderBottom = '2px solid white';
    current_on.style.color = 'white';

    if (pageOnValue === 'faq') {
        let faw_current:any = document.getElementById('faq-general')
        faw_current.style.borderBottom = '2px solid rgb(64, 27, 27)'
    }
})


let is_answer_open:boolean = false;
let current_answer_open:string = '';

function open_answer(question:string) {
    // if answer is open and the current answer open is NOT equal to the given question
    if (is_answer_open && current_answer_open !== question) {
        let answerElementClose:any = document.getElementById(`answer-${current_answer_open}`)
        answerElementClose.style.display = 'none';

        let answerElement:any = document.getElementById(`answer-${question}`)
        answerElement.style.display = 'block';

        is_answer_open = true;
        current_answer_open = question;
    } 
    
    
    
    else if (is_answer_open && current_answer_open == question) {
        let answerElement:any = document.getElementById(`answer-${current_answer_open}`)
        answerElement.style.display = 'none';
        is_answer_open = false;
        current_answer_open = '';
    } 
    
    
    
    
    else {
        let answerElement:any = document.getElementById(`answer-${question}`)
        answerElement.style.display = 'block';
        is_answer_open = true;
        current_answer_open = question;
    }
}


let main_issue:any = []


function button_clicked(input:string) {
    if (main_issue.length > 0) {

        let improve_1:any = document.getElementById(`improve-${main_issue[0]}`);
        improve_1.style.backgroundColor = 'rgb(101, 101, 101)'

        main_issue.length = 0;
        main_issue.push(input);

        let improve_:any = document.getElementById(`improve-${input}`);
        improve_.style.backgroundColor = 'rgb(180, 50, 50)'
    } 
    
    else {

        main_issue.push(input);

        let improve_:any = document.getElementById(`improve-${input}`);
        improve_.style.backgroundColor = 'rgb(180, 50, 50)'

    }
    

}


const improveForm:any = document.getElementById('improveForm');

if (improveForm) {
    improveForm.addEventListener('submit', function(event:any) {
        event.preventDefault()
        
        let issueTitle:any = document.getElementById('improve_feedback_title');
        let issueTitle_value = issueTitle.value;

        let issueFeedback:any = document.getElementById('feedback');
        let issueFeedback_value = issueFeedback.value;

        let issue_tag:any = main_issue[0];

        console.log(issueTitle_value)
        console.log(issueFeedback_value)
        console.log(issue_tag)


    })
}