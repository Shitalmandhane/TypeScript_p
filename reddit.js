var currentPage = 1;
var submitBtn = document.getElementById('submit-btn');
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener('click', function () {
    submitBtn.style.borderColor = 'black';
    submitBtn.style.borderRadius = '4px', 'solid';
    var allTopics = fetchtopics();
    var newid = allTopics[allTopics.length - 1].id + 1;
    var iTopic = document.querySelector("#topic");
    if ((iTopic === null || iTopic === void 0 ? void 0 : iTopic.value.trim()) == "" || (iTopic === null || iTopic === void 0 ? void 0 : iTopic.value) == null) {
        submitBtn.style.cursor = 'not-allowed';
        return;
    }
    var newTopic = {
        id: newid,
        comment: iTopic === null || iTopic === void 0 ? void 0 : iTopic.value,
        like: 0,
        dislike: 0
    };
    var topics = [];
    allTopics.push(newTopic);
    savetopics(allTopics);
    if (decideDisplay(newid, currentPage)) {
        displayTopic(newTopic);
    }
    iTopic.value = "";
    if (newid == 6) {
        decidePagination(allTopics.length);
        eventPagination();
    }
    // eventPagination();
    if (newid > 10) {
        var reminder = newid % 5;
        if (reminder == 1) {
            var nextPageSubmit = Math.trunc(newid / 5) + 1;
            iteration(nextPageSubmit);
            eventPagination();
        }
    }
    eventLikeDislike();
});
eventPagination();
var iTopic = document.getElementById('topic');
iTopic === null || iTopic === void 0 ? void 0 : iTopic.addEventListener('click', function () {
    var submitBtn = document.getElementById('submit-btn');
    if (submitBtn == null)
        return;
    submitBtn.style.cursor = 'default';
});
function displayTopic(newTopic) {
    console.log(newTopic);
    var hostElement = document.getElementById('mainTopic');
    var templateTopic = document.getElementById('displayTopic');
    var importtopicNode = document.importNode(templateTopic.content, true);
    var element = importtopicNode.firstElementChild;
    var upvotecount = element.querySelector('.upvoteCount');
    upvotecount.id = newTopic.id.toString();
    upvotecount.innerText = newTopic.like.toString();
    ;
    var downvotecount = element.querySelector('.downvoteCount');
    downvotecount.id = newTopic.id.toString();
    downvotecount.innerText = newTopic.dislike.toString();
    ;
    var inputTitle = element.querySelector('#inputfield');
    inputTitle.innerHTML = newTopic.comment;
    var like = element.querySelector('.like');
    like.id = newTopic.id.toString();
    var dislike = element.querySelector('.dislike');
    dislike.id = newTopic.id.toString();
    hostElement.insertAdjacentElement('beforeend', element);
}
function displayPagination() {
    var templatePagination = document.getElementById('paginationBar');
    var importNode2 = document.importNode(templatePagination.content, true);
    var element2 = importNode2.firstElementChild;
    var hostElement = document.querySelector('.container');
    hostElement.insertAdjacentElement('afterend', element2);
}
var topics = fetchtopics();
if (topics.length == 0) {
    var newTopic = {
        id: 1,
        comment: 'This is an existing topic returned from the server (mocked)',
        like: 0,
        dislike: 0
    };
    topics.push(newTopic);
    savetopics(topics);
    displayTopic(newTopic);
    eventLikeDislike();
}
else {
    for (var i = 0; i < topics.length && i < 5; i++) {
        displayTopic(topics[i]);
        if (i == 4) {
            decidePagination(topics.length);
        }
    }
    eventLikeDislike();
}
function savetopics(allTopics) {
    localStorage.setItem("redditData", JSON.stringify(allTopics));
}
function fetchtopics() {
    var topicJSON = localStorage.getItem("redditData");
    if (topicJSON == null)
        return [];
    return JSON.parse(topicJSON);
}
function decideDisplay(newid, currentPage) {
    if (newid < 6) {
        return true;
    }
    if (newid > 5 && (Math.trunc(newid / 5) < currentPage)) {
        return true;
    }
    if (newid > 5 && ((Math.trunc(newid / 5) == currentPage) && ((newid / 5) == currentPage))) {
        return true;
    }
}
function decidePagination(totalRecords) {
    if (totalRecords % 5 != 0) {
        var totalPages = Math.trunc((totalRecords) / 5) + 1;
    }
    else {
        var totalPages = totalRecords / 5;
    }
    if (totalPages > 1) {
        displayPagination();
        var listItems = document.querySelectorAll('li');
        listItems[1].style.backgroundColor = '#337ab7';
        listItems[1].style.color = '#fff';
        listItems[1].style.borderRadius = '4px';
        listItems[1].style.borderColor = 'black';
        listItems[0].style.cursor = 'not-allowed';
        eventPagination();
    }
    for (var j = 3; j <= totalPages; j++) {
        var nextPage = j + 1;
        iteration(j);
        eventPagination();
    }
}
function iteration(nextPage) {
    var _a;
    var newli = document.createElement('li');
    newli.innerHTML = nextPage.toString();
    var ul = document.querySelector('.testclass');
    (_a = ul === null || ul === void 0 ? void 0 : ul.lastElementChild) === null || _a === void 0 ? void 0 : _a.before(newli);
    var listItems = document.querySelectorAll('li');
    listItems[listItems.length - 1].style.cursor = 'default';
}
function eventPagination() {
    var listItems = document.querySelectorAll('li');
    var list1 = document.querySelector('.testclass');
    list1 === null || list1 === void 0 ? void 0 : list1.addEventListener('click', function (event) {
        event.stopImmediatePropagation();
        var listItems = document.querySelectorAll('li');
        var eventPage = event.target.innerHTML;
        listItems[listItems.length - 1].style.cursor = 'allowed';
        listItems[currentPage].style.backgroundColor = 'white';
        listItems[currentPage].style.color = '#337ab7';
        listItems[currentPage].style.borderColor = '#ddd';
        var allTopics = fetchtopics();
        if (allTopics.length % 5 != 0) {
            var totalPages = Math.trunc((allTopics.length) / 5) + 1;
        }
        else {
            var totalPages = allTopics.length / 5;
        }
        if (eventPage == 'Previous') {
            if (currentPage == 1) {
                listItems[currentPage].style.backgroundColor = '#337ab7';
                listItems[currentPage].style.color = '#fff';
                listItems[currentPage].style.borderColor = '#ddd';
                return;
            }
            var eventPage = (((currentPage)) - 1).toString();
            console.log('jump to page', eventPage);
            listItems[currentPage].style.borderColor = '#ddd';
            currentPage = parseInt(eventPage);
        }
        if (eventPage == 'Next') {
            if (totalPages == currentPage) {
                listItems[currentPage].style.backgroundColor = '#337ab7';
                listItems[currentPage].style.color = '#fff';
                listItems[currentPage].style.borderColor = '#ddd';
                return;
            }
            listItems[currentPage].style.borderColor = '#ddd';
            eventPage = (currentPage + 1).toString();
            console.log('jump to page', eventPage);
            currentPage = parseInt(eventPage);
        }
        listItems[parseInt(eventPage)].style.backgroundColor = '#337ab7';
        listItems[parseInt(eventPage)].style.color = '#fff';
        listItems[parseInt(eventPage)].style.borderRadius = '4px';
        listItems[parseInt(eventPage)].style.borderColor = 'black';
        var startRec = (parseInt(eventPage) - 1) * 5;
        var elems = document.querySelectorAll('.allTopic');
        elems.forEach(function (topic) {
            topic.remove();
        });
        currentPage = parseInt(eventPage);
        for (var x = startRec; x < (startRec + 5) && x < allTopics.length; x++) {
            displayTopic(allTopics[x]);
        }
        eventLikeDislike();
        if (parseInt(eventPage) == 1) {
            listItems[0].style.cursor = 'not-allowed';
        }
        else {
            listItems[0].style.cursor = 'default';
        }
        if (parseInt(eventPage) == totalPages) {
            listItems[listItems.length - 1].style.cursor = 'not-allowed';
            // listItems[0].style.color = '#fff';
            // listItems[0].style.borderRadius = '4px';
            // listItems[0].style.borderColor = 'black';
        }
        else {
            listItems[listItems.length - 1].style.cursor = 'default';
        }
    });
}
function eventLikeDislike() {
    var like = document.getElementsByClassName('like');
    var dislike = document.querySelectorAll('.dislike');
    var upvoteCount = document.querySelectorAll('.upvoteCount');
    var downvoteCount = document.querySelectorAll('.downvoteCount');
    var _loop_1 = function (i_1) {
        like[i_1].addEventListener('click', function () {
            like[i_1].removeEventListener;
            var temp = parseInt(upvoteCount[i_1].innerHTML);
            if (temp == 0) {
                upvoteCount[i_1].innerHTML = "1";
                downvoteCount[i_1].innerHTML = "0";
                var fetchId = parseInt(like[i_1].id);
                var updateAction = 'like';
                var updateCountlike = "1";
                var updateCountdislike = "0";
                UpdateLocal(fetchId, updateAction, updateCountlike, updateCountdislike);
            }
            else {
                upvoteCount[i_1].innerHTML = "0";
                fetchId = parseInt(like[i_1].id);
                updateAction = 'like';
                updateCountlike = "0";
                updateCountdislike = (downvoteCount[i_1].innerHTML);
                UpdateLocal(fetchId, updateAction, updateCountlike, updateCountdislike);
            }
            sortlikeCount();
            eventLikeDislike();
        });
    };
    for (var i_1 = 0; i_1 < like.length; i_1++) {
        _loop_1(i_1);
    }
    var _loop_2 = function (i_2) {
        dislike[i_2].addEventListener('click', function () {
            dislike[i_2].removeEventListener;
            var temp1 = parseInt(downvoteCount[i_2].innerHTML);
            if (temp1 == 0) {
                downvoteCount[i_2].innerHTML = "1";
                upvoteCount[i_2].innerHTML = "0";
                var fetchId = parseInt(like[i_2].id);
                var updateAction = 'dislike';
                var updateCountlike = "0";
                var updateCountdislike = "1";
                UpdateLocal(fetchId, updateAction, updateCountlike, updateCountdislike);
            }
            else {
                downvoteCount[i_2].innerHTML = "0";
                var fetchId = parseInt(like[i_2].id);
                updateAction = 'dislike';
                updateCountlike = "0";
                updateCountdislike = "0";
                UpdateLocal(fetchId, updateAction, updateCountlike, updateCountdislike);
            }
            sortlikeCount();
            eventLikeDislike();
        });
    };
    for (var i_2 = 0; i_2 < dislike.length; i_2++) {
        _loop_2(i_2);
    }
}
function UpdateLocal(fetchId, updateAction, updateCountlike, updateCountdislike) {
    var allTopics = fetchtopics();
    var redditData = 'redditData';
    var objIndex = allTopics.findIndex((function (obj) { return obj.id == fetchId; }));
    allTopics[objIndex].like = parseInt(updateCountlike);
    allTopics[objIndex].dislike = parseInt(updateCountdislike);
    localStorage.setItem(redditData, JSON.stringify(allTopics));
}
function sortlikeCount() {
    var allTopics = fetchtopics();
    for (var i = 0; i < allTopics.length; i++) {
        for (var j = 0; j < (allTopics.length - 1); j++) {
            if (allTopics[j].like < allTopics[j + 1].like) {
                var temp = allTopics[j];
                allTopics[j] = allTopics[j + 1];
                allTopics[j + 1] = temp;
            }
        }
    }
    for (i = 0; i < allTopics.length; i++) {
        for (j = 0; j < (allTopics.length - 1); j++) {
            if (allTopics[j].like == allTopics[j + 1].like) {
                if (allTopics[j].id > allTopics[j + 1].id) {
                    var temp = allTopics[j];
                    allTopics[j] = allTopics[j + 1];
                    allTopics[j + 1] = temp;
                }
            }
        }
    }
    var redditData = 'redditData';
    localStorage.setItem(redditData, JSON.stringify(allTopics));
    var z = (currentPage - 1) * 5;
    var elems = document.querySelectorAll('.allTopic');
    elems.forEach(function (topic) {
        topic.remove();
    });
    for (var x = z; x < (z + 5) && x < allTopics.length; x++) {
        displayTopic(allTopics[x]);
    }
}
