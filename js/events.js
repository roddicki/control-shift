// format incoming data from google sheet
// split into past and upcoming based on date  
function formatEvents(data) {
  for (var i = 0; i < data.length; i++) {
    console.log(data[i]);
    let dateNow = new Date();
    dateNow.setDate(dateNow.getDate()-1);
    let eventDate = new Date(data[i]['date-of-event']);
    let slug = data[i]['slug'];
    let artworkName = data[i]['title-of-work'];
    let card = document.createElement("div");
    card.className = "card event-card";
    card.onclick = function() {
        console.log('clicked id=' +  id);
        location.href = "artwork.html?artwork="+slug;
    }

    let cardRow = document.createElement("div");
    cardRow.className = "row";

    let cardColTitle = document.createElement("div");
    cardColTitle.className = "col-sm-8";

    let title = document.createElement("h2");
    title.className = "card-title";
    title.innerHTML = "<a href='artwork.html?artwork="+slug+"'>"+artworkName + "<br>by " + data[i]['artist-name']+"</a>";

    cardColTitle.appendChild(title);

    let cardColDate = document.createElement("div");
    cardColDate.className = "date";

    let eventTime = document.createElement("h2");
    eventTime.className = "card-text text-muted";
    eventTime.innerHTML = eventDate.toDateString();

    cardColDate.appendChild(eventTime);

    cardRow.appendChild(cardColTitle);
    //cardRow.appendChild(cardColDate);
    card.appendChild(cardRow);

    let synopsisText = data[i]['event-synopsis'];
    let shortdescription = document.createElement("p");
    shortdescription.className = "card-text";
    shortdescription.innerHTML = synopsisText;

    let cardColSynopis = document.createElement("div");
    cardColSynopis.className = "col-sm text-muted";
    cardColSynopis.innerHTML = data[i]['artwork-type'] + " - " + data[i]['event-synopsis'];

    cardRow = document.createElement("div");
    cardRow.className = "row";
    cardRow.appendChild(cardColSynopis);
    card.appendChild(cardRow);
    card.appendChild(cardColDate);

    let link = document.createElement("a");
    link.className = "btn btn-primary stretched-link";
    link.href="event.html?id=";
    link.innerHTML = "More..."
    
    if(data[i]['show-on-website'] && eventDate >= dateNow) {
      document.querySelector(".upcoming-events").appendChild(card);
    } 
    /*else if(data[i]['show-on-website'] && eventDate < dateNow) {
      document.querySelector(".past-events").appendChild(card);
    }*/
  }
}

function formatEventPage(slug, data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i]['slug'] == slug) {
      console.log(data[i]);
      let info = "<h2>Temporary info dump:</h2> <br>";
      for (const [key, value] of Object.entries(data[i])) {
        info += key+": "+value+"<br>"
        console.log(`${key}: ${value}`);
      }
      document.querySelector(".info").innerHTML = info;
    }
  }
}

// sort google sheet data by date
function custom_sort(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

// get query by param key
function getParamKey(key) {
  const urlParams = new URLSearchParams(location.search);
  const val = urlParams.get(key)
  return val;
}

// get json data from google sheet and format
function getHomePageData(){
  $.ajax({
    type: 'GET',
    url: 'https://script.google.com/macros/s/AKfycbwoIykn6ohjA1gLzdcpv_88WQFRt556oLMjcGjwwhQM9zP5eD6tluIqIiCye3j-sOET/exec',
    data: {get_param: 'value'},
    dataType: 'json',
    success: function (data) {
      console.log(data.sort(custom_sort));
      let sortedData = data.sort(custom_sort)
      formatEvents(sortedData);
    }
  });
}

// get json data from google sheet and format
function getEventData(){
  $.ajax({
    type: 'GET',
    url: 'https://script.google.com/macros/s/AKfycbwoIykn6ohjA1gLzdcpv_88WQFRt556oLMjcGjwwhQM9zP5eD6tluIqIiCye3j-sOET/exec',
    data: {get_param: 'value'},
    dataType: 'json',
    success: function (data) {
      let slug = getParamKey('artwork');
      formatEventPage(slug, data);
    }
  });
}

//getData();






  