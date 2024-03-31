"use strict";
window.addEventListener('load', function () {
    let pageOn = document.getElementById('page-on');
    let pageOnValue = pageOn.value;
    let current_on = document.getElementById(pageOnValue);
    current_on.style.borderBottom = '2px solid white';
    current_on.style.color = 'white';
    if (pageOnValue === 'faq') {
        let faw_current = document.getElementById('faq-general');
        faw_current.style.borderBottom = '2px solid rgb(64, 27, 27)';
    }
});
let is_answer_open = false;
let current_answer_open = '';
function open_answer(question) {
    if (is_answer_open && current_answer_open !== question) {
        let answerElementClose = document.getElementById(`answer-${current_answer_open}`);
        answerElementClose.style.display = 'none';
        let answerElement = document.getElementById(`answer-${question}`);
        answerElement.style.display = 'block';
        is_answer_open = true;
        current_answer_open = question;
    }
    else if (is_answer_open && current_answer_open == question) {
        let answerElement = document.getElementById(`answer-${current_answer_open}`);
        answerElement.style.display = 'none';
        is_answer_open = false;
        current_answer_open = '';
    }
    else {
        let answerElement = document.getElementById(`answer-${question}`);
        answerElement.style.display = 'block';
        is_answer_open = true;
        current_answer_open = question;
    }
}
let main_issue = [];
function button_clicked(input) {
    if (main_issue.length > 0) {
        let improve_1 = document.getElementById(`improve-${main_issue[0]}`);
        improve_1.style.backgroundColor = 'rgb(101, 101, 101)';
        main_issue.length = 0;
        main_issue.push(input);
        let improve_ = document.getElementById(`improve-${input}`);
        improve_.style.backgroundColor = 'rgb(180, 50, 50)';
    }
    else {
        main_issue.push(input);
        let improve_ = document.getElementById(`improve-${input}`);
        improve_.style.backgroundColor = 'rgb(180, 50, 50)';
    }
}
const improveForm = document.getElementById('improveForm');
if (improveForm) {
    improveForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let issueTitle = document.getElementById('improve_feedback_title');
        let issueTitle_value = issueTitle.value;
        let issueFeedback = document.getElementById('feedback');
        let issueFeedback_value = issueFeedback.value;
        let issue_tag = main_issue[0];
        console.log(issueTitle_value);
        console.log(issueFeedback_value);
        console.log(issue_tag);
    });
}
