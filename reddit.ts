type Topic =
  {
    id: number
    comment: string
    like: number
    dislike: number
  }
let currentPage: number = 1;

const submitBtn = document.getElementById('submit-btn')

submitBtn?.addEventListener('click', () =>
{
  submitBtn.style.borderColor = 'black';
  submitBtn.style.borderRadius = '4px', 'solid';

  const allTopics: Topic[] = fetchtopics()

  var newid = allTopics[allTopics.length - 1].id + 1;
  const iTopic = document.querySelector<HTMLInputElement>("#topic")

  if (iTopic?.value.trim() == "" || iTopic?.value == null)
  {
    submitBtn.style.cursor = 'not-allowed';
    return
  }
  const newTopic: Topic =
  {
    id: newid,
    comment: iTopic?.value,
    like: 0,
    dislike: 0,
  }
  var topics: Topic[] = [];
  allTopics.push(newTopic)
  savetopics(allTopics)
  if (decideDisplay(newid, currentPage))
  {
    displayTopic(newTopic)
  }
  iTopic.value = "";
  if (newid == 6)
  {
    decidePagination(allTopics.length);
    eventPagination();

  }
  // eventPagination();


  if (newid > 10)
  {
    let reminder = newid % 5;
    if (reminder == 1)
    {
      var nextPageSubmit: number = Math.trunc(newid / 5) + 1;
      iteration(nextPageSubmit);
      eventPagination();
    }
  }
  eventLikeDislike()
});
eventPagination();
const iTopic = document.getElementById('topic');
iTopic?.addEventListener('click', () =>
{
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn == null)
    return
  submitBtn.style.cursor = 'default';
});
function displayTopic (newTopic: Topic): void
{
  console.log(newTopic);
  const hostElement = document.getElementById('mainTopic')! as HTMLDivElement;
  const templateTopic = document.getElementById('displayTopic')! as HTMLTemplateElement;
  const importtopicNode = document.importNode(templateTopic.content, true);
  const element = importtopicNode.firstElementChild as HTMLDivElement;
  const upvotecount = element.querySelector('.upvoteCount') as HTMLElement;
  upvotecount.id = newTopic.id.toString();
  upvotecount.innerText = newTopic.like.toString();;
  const downvotecount = element.querySelector('.downvoteCount') as HTMLElement;
  downvotecount.id = newTopic.id.toString();
  downvotecount.innerText = newTopic.dislike.toString();;
  const inputTitle = element.querySelector('#inputfield') as HTMLElement;
  inputTitle.innerHTML = newTopic.comment;
  const like = element.querySelector('.like') as HTMLElement;
  like.id = newTopic.id.toString();
  const dislike = element.querySelector('.dislike') as HTMLElement;
  dislike.id = newTopic.id.toString();
  hostElement.insertAdjacentElement('beforeend', element)
}
function displayPagination (): void
{
  const templatePagination = document.getElementById('paginationBar')! as HTMLTemplateElement;
  const importNode2 = document.importNode(templatePagination.content, true);
  const element2 = importNode2.firstElementChild as HTMLUListElement;
  const hostElement = document.querySelector('.container')! as HTMLDivElement;
  hostElement.insertAdjacentElement('afterend', element2);
}

var topics: Topic[] = fetchtopics()

if (topics.length == 0)
{
  const newTopic: Topic =
  {
    id: 1,
    comment: 'This is an existing topic returned from the server (mocked)',
    like: 0,
    dislike: 0,
  }

  topics.push(newTopic)
  savetopics(topics)
  displayTopic(newTopic)
  eventLikeDislike()
}
else
{
  for (var i = 0; i < topics.length && i < 5; i++)
  {
    displayTopic(topics[i]);
    if (i == 4)
    {
      decidePagination(topics.length);
    }

  }
  eventLikeDislike()
}

function savetopics (allTopics: Topic[])
{
  localStorage.setItem("redditData", JSON.stringify(allTopics))
}
function fetchtopics (): Topic[]
{
  const topicJSON = localStorage.getItem("redditData")
  if (topicJSON == null) return []
  return JSON.parse(topicJSON)
}
function decideDisplay (newid: number, currentPage: number)
{
  if (newid < 6)
  {
    return true;
  }

  if (newid > 5 && (Math.trunc(newid / 5) < currentPage))
  {
    return true;
  }

  if (newid > 5 && ((Math.trunc(newid / 5) == currentPage) && ((newid / 5) == currentPage)))
  {
    return true;
  }

}
function decidePagination (totalRecords: number): void
{
  if (totalRecords % 5 != 0)
  {
    var totalPages: number = Math.trunc((totalRecords) / 5) + 1;
  }
  else
  {
    var totalPages: number = totalRecords / 5;
  }


  if (totalPages > 1)
  {
    displayPagination()
    const listItems = document.querySelectorAll('li');
    listItems[1].style.backgroundColor = '#337ab7';
    listItems[1].style.color = '#fff';
    listItems[1].style.borderRadius = '4px';
    listItems[1].style.borderColor = 'black';
    listItems[0].style.cursor = 'not-allowed';
    eventPagination()
  }
  for (let j = 3; j <= totalPages; j++)
  {
    let nextPage = j + 1;
    iteration(j);
    eventPagination();
  }
}

function iteration (nextPage: number)
{
  const newli = document.createElement('li');
  newli.innerHTML = nextPage.toString();
  var ul = document.querySelector('.testclass');
  ul?.lastElementChild?.before(newli)
  var listItems = document.querySelectorAll('li');
  listItems[listItems.length - 1].style.cursor = 'default';

}
function eventPagination ()
{
  var listItems = document.querySelectorAll('li');
  var list1 = document.querySelector('.testclass');
  list1?.addEventListener('click', function (event)
  {
    event.stopImmediatePropagation();
    const listItems = document.querySelectorAll('li');
    var eventPage: string = (event.target as Element).innerHTML;
    listItems[listItems.length - 1].style.cursor = 'allowed';
    listItems[currentPage].style.backgroundColor = 'white';
    listItems[currentPage].style.color = '#337ab7';
    listItems[currentPage].style.borderColor = '#ddd';
    const allTopics: Topic[] = fetchtopics()
    if (allTopics.length % 5 != 0)
    {
      var totalPages = Math.trunc((allTopics.length) / 5) + 1;
    }
    else
    {
      var totalPages = allTopics.length / 5;
    }

    if (eventPage == 'Previous')
    {
      if (currentPage == 1)
      {

        listItems[currentPage].style.backgroundColor = '#337ab7';
        listItems[currentPage].style.color = '#fff';
        listItems[currentPage].style.borderColor = '#ddd';

        return;
      }
      var eventPage: string = (((currentPage)) - 1).toString();
      console.log('jump to page', eventPage);
      listItems[currentPage].style.borderColor = '#ddd';
      currentPage = parseInt(eventPage);
    }
    if (eventPage == 'Next')
    {
      if (totalPages == currentPage)
      {
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

    let startRec = (parseInt(eventPage) - 1) * 5;
    var elems = document.querySelectorAll('.allTopic');
    elems.forEach(topic =>
    {
      topic.remove();
    }
    );

    currentPage = parseInt(eventPage);

    for (let x = startRec; x < (startRec + 5) && x < allTopics.length; x++)
    {
      displayTopic(allTopics[x]);
    }
    eventLikeDislike();

    if (parseInt(eventPage) == 1)
    {
      listItems[0].style.cursor = 'not-allowed';
    }
    else
    {
      listItems[0].style.cursor = 'default';
    }
    if (parseInt(eventPage) == totalPages)
    {
      listItems[listItems.length - 1].style.cursor = 'not-allowed';
      // listItems[0].style.color = '#fff';
      // listItems[0].style.borderRadius = '4px';
      // listItems[0].style.borderColor = 'black';
    }
    else
    {
      listItems[listItems.length - 1].style.cursor = 'default';
    }
  });
}

function eventLikeDislike ()
{
  const like = document.getElementsByClassName('like');
  const dislike = document.querySelectorAll('.dislike');
  var upvoteCount = document.querySelectorAll('.upvoteCount')
  var downvoteCount = document.querySelectorAll('.downvoteCount')
  for (let i = 0; i < like.length; i++)
  {

    like[i].addEventListener('click', () =>
    {
      like[i].removeEventListener;
      let temp = parseInt(upvoteCount[i].innerHTML);
      if (temp == 0)
      {
        upvoteCount[i].innerHTML = "1";
        downvoteCount[i].innerHTML = "0";
        var fetchId: number = parseInt(like[i].id);
        var updateAction: string = 'like';
        var updateCountlike: string = "1";
        var updateCountdislike: string = "0";
        UpdateLocal(fetchId, updateAction, updateCountlike, updateCountdislike);
      }
      else
      {
        upvoteCount[i].innerHTML = "0";
        fetchId = parseInt(like[i].id);
        updateAction = 'like';
        updateCountlike = "0";
        updateCountdislike = (downvoteCount[i].innerHTML);
        UpdateLocal(fetchId, updateAction, updateCountlike, updateCountdislike);
      }
      sortlikeCount();
      eventLikeDislike()
    });
  }
  for (let i = 0; i < dislike.length; i++) 
  {
    dislike[i].addEventListener('click', () =>
    {
      dislike[i].removeEventListener;
      let temp1 = parseInt(downvoteCount[i].innerHTML);
      if (temp1 == 0) 
      {
        downvoteCount[i].innerHTML = "1";
        upvoteCount[i].innerHTML = "0";
        var fetchId: number = parseInt(like[i].id);
        var updateAction = 'dislike';
        var updateCountlike = "0";
        var updateCountdislike = "1";
        UpdateLocal(fetchId, updateAction, updateCountlike, updateCountdislike);
      }
      else
      {
        downvoteCount[i].innerHTML = "0";
        var fetchId: number = parseInt(like[i].id);
        updateAction = 'dislike';
        updateCountlike = "0";
        updateCountdislike = "0";
        UpdateLocal(fetchId, updateAction, updateCountlike, updateCountdislike);
      }
      sortlikeCount();
      eventLikeDislike()
    });
  }
}

function UpdateLocal (fetchId: number, updateAction: string, updateCountlike: string, updateCountdislike: string): void
{
  const allTopics: Topic[] = fetchtopics();
  let redditData = 'redditData';
  var objIndex: number = allTopics.findIndex((obj => obj.id == fetchId));
  allTopics[objIndex].like = parseInt(updateCountlike);
  allTopics[objIndex].dislike = parseInt(updateCountdislike);
  localStorage.setItem(redditData, JSON.stringify(allTopics));
}

function sortlikeCount (): void
{
  const allTopics: Topic[] = fetchtopics()
  for (var i = 0; i < allTopics.length; i++)
  {
    for (var j = 0; j < (allTopics.length - 1); j++)
    {
      if (allTopics[j].like < allTopics[j + 1].like)
      {
        var temp = allTopics[j]
        allTopics[j] = allTopics[j + 1]
        allTopics[j + 1] = temp
      }
    }
  }
  for (i = 0; i < allTopics.length; i++)
  {
    for (j = 0; j < (allTopics.length - 1); j++)
    {
      if (allTopics[j].like == allTopics[j + 1].like)
      {
        if (allTopics[j].id > allTopics[j + 1].id)
        {
          var temp = allTopics[j]
          allTopics[j] = allTopics[j + 1]
          allTopics[j + 1] = temp
        }
      }
    }
  }
  let redditData = 'redditData';
  localStorage.setItem(redditData, JSON.stringify(allTopics));
  let z = (currentPage - 1) * 5;
  var elems = document.querySelectorAll('.allTopic');
  elems.forEach(topic =>
  {
    topic.remove();
  }
  );
  for (let x = z; x < (z + 5) && x < allTopics.length; x++)
  {
    displayTopic(allTopics[x]);

  }
}
