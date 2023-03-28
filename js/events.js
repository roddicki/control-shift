// HOME PAGE FORMATTING
// format incoming data from google sheet
// split into past and upcoming based on date
function formatEvents(data) {
  for (var i = 0; i < data.length; i++) {
    let dateNow = new Date();
    dateNow.setDate(dateNow.getDate() - 1);
    let eventDate = new Date(data[i]["start-date"]);
    let slug = data[i]["slug"];
    let artworkName = data[i]["title-of-work"];
    let card = document.createElement("div");
    card.className = "card event-card";
    card.onclick = function() {
      location.href = "artwork.html?artwork=" + slug;
    };

    let cardRow = document.createElement("div");
    cardRow.className = "row";

    let cardColTitle = document.createElement("div");
    cardColTitle.className = "col-sm-8";

    let title = document.createElement("h2");
    title.className = "card-title";
    title.innerHTML =
      "<a href='artwork.html?artwork=" +
      slug +
      "'>" +
      artworkName +
      "<br>by " +
      data[i]["artist-name"] +
      "</a>";

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

    let synopsisText = data[i]["artwork-synopsis"];
    let shortdescription = document.createElement("p");
    shortdescription.className = "card-text";
    shortdescription.innerHTML = synopsisText;

    let cardColSynopis = document.createElement("div");
    cardColSynopis.className = "col-sm text-muted";
    cardColSynopis.innerHTML = data[i]["artwork-synopsis"];

    cardRow = document.createElement("div");
    cardRow.className = "row";
    cardRow.appendChild(cardColSynopis);
    card.appendChild(cardRow);
    card.appendChild(cardColDate);

    let link = document.createElement("a");
    link.className = "btn btn-primary stretched-link";
    link.href = "event.html?id=";
    link.innerHTML = "More...";

    if (data[i]["show-on-website"] && eventDate >= dateNow) {
      document.querySelector(".upcoming-events").appendChild(card);
    }
    /*else if(data[i]['show-on-website'] && eventDate < dateNow) {
      document.querySelector(".past-events").appendChild(card);
    }*/
  }
}

// PROGRAMME PAGE FORMATTING
// format incoming data from google sheet
// split into past and upcoming based on date
function formatProgEvents(data) {
  for (var i = 0; i < data.length; i++) {
    let dateNow = new Date();
    dateNow.setDate(dateNow.getDate() - 1);
    let eventDate = new Date(data[i]["start-date"]);
    let slug = data[i]["slug"];
    let artworkName = data[i]["title-of-work"];
    let startDate = new Date(data[i]["start-date"]);
    let endDate;
    if (data[i]["end-date"]) {
      endDate = new Date(data[i]["end-date"]);
    }
    let card = document.createElement("div");

    // setting data-attribute on artist divs so user can filter by date and location
    let filters = `${data[i]["location-filter"]} ${data[i]["date-filter"]}`;
    card.setAttribute("data-filterable", filters);

    if (data[i]["title-of-work"] === "Lunchtime talk") {
      console.log(data[i]["date-filter"], filters);
    }
    card.className = `col-md-4 pt-4 pb-3`;
    card.onclick = function() {
      location.href = "artwork.html?artwork=" + slug;
    };

    let imgLink = document.createElement("a");
    imgLink.className = "thumbnail";
    imgLink.href = "artwork.html?artwork=" + slug;

    let imgContainer = document.createElement("div");
    imgContainer.className = "blueSquare";

    let img = document.createElement("img");
    let imgSrc = data[i]["artwork-image-thumb-url"];
    // if image does not begin with http
    if (imgSrc.indexOf("http") == -1) {
      imgSrc = "img/2022/" + data[i]["artwork-image-thumb-url"];
    }
    img.src = imgSrc;
    img.alt = data[i]["alt-text-artwork-thumb"];
    img.className = "mx-auto d-block thumb-img img-fluid";

    imgContainer.appendChild(img);
    imgLink.appendChild(imgContainer);
    card.appendChild(imgLink);

    let textContainer = document.createElement("div");

    let textLink = document.createElement("a");
    textLink.className = "mainLinkText";
    textLink.href = "artwork.html?artwork=" + slug;

    let title = document.createElement("div");
    title.className = "gridText gridTitle pt-4 text-center";
    title.innerHTML = artworkName;

    let artist = document.createElement("div");
    artist.className = "gridText gridAbout pt-0 text-center";
    artist.innerHTML = "by " + data[i]["artist-name"];

    let description = document.createElement("div");
    description.className = "gridText aboutText pt-2 text-center";
    description.innerHTML = data[i]["artwork-synopsis"];

    let dates = document.createElement("div");
    dates.className = "gridText gridAbout pt-2 text-center";
    let dateDescription = startDate.toDateString();
    if (endDate) {
      dateDescription =
        startDate.toDateString() + " - " + endDate.toDateString();
    }
    dates.innerHTML = dateDescription;

    textLink.appendChild(title);
    textLink.appendChild(artist);
    if (data[i]["show-date"]) {
      textLink.appendChild(dates);
    }
    textLink.appendChild(description);

    textContainer.appendChild(textLink);
    card.appendChild(textContainer);

    if (data[i]["show-on-website"] && endDate >= dateNow) {
      document.querySelector("#upcoming-events").appendChild(card);
    } else if (data[i]["show-on-website"] && startDate >= dateNow) {
      document.querySelector("#upcoming-events").appendChild(card);
    } else if (data[i]["show-on-website"] && startDate < dateNow) {
      document.querySelector("#past-events").appendChild(card);
    }
  }

  // FILTER FUNCTIONALITY
  const el_filters = document.querySelectorAll('[name="filter"]'),
    el_filterable = document.querySelectorAll("[data-filterable]");
  const applyFilter = () => {
    // Filter checked inputs
    const el_checked = [...el_filters].filter((el) => el.checked && el.value);
    // Collect checked inputs values to array
    const filters = [...el_checked].map((el) => el.value);
    // Get elements to filter
    const el_filtered = [...el_filterable].filter((el) => {
      const props = el
        .getAttribute("data-filterable")
        .trim()
        .split(/\s+/);
      return filters.every((fi) => props.includes(fi));
    });
    console.log("el_filtered", el_filtered);
    el_filtered.length === 0
      ? (document.getElementById("noEvents-placeholder").style.display =
          "inline")
      : (document.getElementById("noEvents-placeholder").style.display =
          "none");
    // Hide all
    el_filterable.forEach((el) => el.classList.add("is-hidden"));
    // Show filtered
    el_filtered.forEach((el) => el.classList.remove("is-hidden"));

    if (document.querySelector("#past-events").hasChildNodes()) {
      let array = [...document.querySelector("#past-events").childNodes];
      console.log("ARRAY", array);
      // onnly show 'past events' title if there are past events there
      let someShow = false;
      array.forEach((el) => {
        if (!el.className.includes("is-hidden")) someShow = true;
      });
      if (!someShow) {
        document.getElementById("pastEventsTitle").style.display = "none";
      } else {
        document.getElementById("pastEventsTitle").style.display = "block";
      }
    }
  };
  // Assign event listener
  el_filters.forEach((el) => el.addEventListener("change", applyFilter));

  // Init
  applyFilter();
}

// INDIVIDUAL ARTWORK FORMATTING
function formatEventPage(slug, data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i]["slug"] == slug) {
      if (data[i]["title-of-work"] === "The Almost") {
      }

      // ARTWORK IMAGE
      const artworksWithSlider = ["The Almost"];
      if (artworksWithSlider.includes(data[i]["title-of-work"])) {
        // document.getElementById('sliderImage').classList.add("showElement");
        // call slider JS
      } else {
        // if artist does not need a slider then pull main image from google sheets
        // let artworkImgContainer = document.querySelector(".artwork-image");
        // let artworkImg = document.createElement("img");
        // artworkImg.className = "img-fluid";
        // let artworkSrc = data[i]["artwork-image-url"];
        // // if image does not begin with http
        // if (artworkSrc.indexOf("http") == -1) {
        //   artworkSrc = "img/2022/" + data[i]["artwork-image-url"];
        // }
        // artworkImg.src = artworkSrc;
        // artworkImg.alt = data[i]["alt-text-artwork-image"];
        // artworkImgContainer.appendChild(artworkImg);
        // artworkImg.innerHTML = '<img src="' + data[i]["artwork-image-url"] + '"> '; //data[i]['artwork-image-url'];
      }
      let artworkTitle = document.querySelector(".artwork-title-text");
      //artworkTitle.innerHTML = "<a href=\"programme.html\"> <i class=\"fas fa-arrow-left\" aria-hidden=\"true\"></i></a>" + data[i]['title-of-work'];
      artworkTitle.innerHTML = data[i]["title-of-work"];

      let artistName = document.querySelector(".artist-name-text");
      artistName.innerHTML = data[i]["artist-name"];

      // Adding artwork type
      let artworkType = document.querySelector(".artwork-type");
      artworkType.innerHTML = data[i]["artwork-type"];

      if (!data[i]["link-1-text"] && !data[i]["link-2-text"] && data[i]["start-date"]) {
        let noShowLine = document.getElementsByClassName("hide-when-empty");
        for (let item of noShowLine) {
          item.style.display = "none";
        }
      }
      // Adding location to furthest left column
      if (data[i]["link-1-text"]){
        let col = document.createElement("div");
        col.className = "col-sm pt-2";
        let text = document.createElement("h2")
        text.className = "locationInfo text-center"
        let eventLocation = "";
        if (data[i]["link-1"]) {
          eventLocation = `<a class="map-icon" href=${data[i]["link-1"]} target="_blank">${data[i]["link-1-text"]}</a>`;
        } else if (data[i]["link-1-text"]) {
          eventLocation = data[i]["link-1-text"];
        }
        text.innerHTML += eventLocation;
        col.appendChild(text);
        let artworkInfoRow = document.querySelector(".artwork-info");
        artworkInfoRow.appendChild(col);
      }




      // date column
      let artworkDate = document.querySelector(".artwork-date");
      let needsDate = data[i]["show-date"];
      if (needsDate) {
        let col = document.createElement("div");
        col.className = "col-sm";
        // <h2 class="pt-2 pb-3 text-center artwork-date">Sun Oct 30 2022<br>14:00 - 17:00</h2>

        let startDate;
        let endDate;
        let dateDescription = "";
        if (data[i]["start-date"]) {
          startDate = new Date(data[i]["start-date"]);
          dateDescription = startDate.toDateString();
        }

        if (data[i]["end-date"]) {
          endDate = new Date(data[i]["end-date"]);
          dateDescription =
            startDate.toDateString() + " -<br>" + endDate.toDateString();
        }

        if (data[i]["start-time"] && data[i]["end-time"]) {
          dateDescription +=
            "<br>" + data[i]["start-time"] + " - " + data[i]["end-time"];
        } else if (data[i]["start-time"]) {
          dateDescription += "<br>" + data[i]["start-time"];
        }

        col.innerHTML =
          '<h2 class="pt-2 pb-3 text-center artwork-date">' +
          dateDescription +
          "</h2>";

        let artworkInfoRow = document.querySelector(".artwork-info");
        artworkInfoRow.appendChild(col);
      }

      // booking call to action columns and links
      let linkTwoText = data[i]["link-2-text"];
      if (linkTwoText) {
        let col = document.createElement("div");
        col.className = "col-sm";
        let linkTwoH2 = document.createElement("h2");
        linkTwoH2.className = "pt-2 text-center artwork-book";
        linkTwoLink = data[i]["link-2"];
        let artworkBooking;
        if (linkTwoLink) {
          artworkBooking = `<div><a class="linkTwo" target="_blank" href=${data[i]["link-2"]}>${linkTwoText}</a></div>`;
        } else {
          artworkBooking = `${linkTwoText}<br>`;
        }
        linkTwoH2.innerHTML = artworkBooking;

        
        let linkThreeH2 = document.createElement("h2");
        linkThreeH2.className = "pt-2 text-center artwork-book";
        let artworkBookingTwo;
        if (data[i]["link-3-text"]) {
          console.log('data',data[i]["link-3"],data[i]["link-3-text"])
          if (data[i]["link-3"]) {
            artworkBookingTwo = `<div><a class="linkTwo" target="_blank" href=${data[i]["link-3"]}>${data[i]["link-3-text"]}</a></div>`;
          } else {
            artworkBookingTwo = `${data[i]["link-3"]}<br>`;
          }
          linkThreeH2.innerHTML += artworkBookingTwo;
        }

        col.appendChild(linkTwoH2);
        col.appendChild(linkThreeH2);

        let artworkInfoRow = document.querySelector(".artwork-info");
        artworkInfoRow.appendChild(col);
      }

      let artworkInfoText = document.querySelector(".artwork-info-text");
      artworkInfoText.innerHTML = data[i]["artwork-copy"];

      let artistShortName = document.querySelector(".artist-short-name");
      artistShortName.innerHTML = data[i]["artist-short-name"];

      let artistBio = document.querySelector(".artist-bio-text");
      artistBio.innerHTML = data[i]["artist-bio"];

      if (data[i]["artist-website-url"]) {
        let artistWebsite = document.querySelector("#website-container");
        artistWebsite.style.display = "inline";
        let artistWebsiteLink = document.querySelector("#websiteLink");
        artistWebsiteLink.href = data[i]["artist-website-url"];
      }

      if (data[i]["artist-social-instagram"]) {
        let artistInsta = document.querySelector("#instagram-container");
        artistInsta.style.display = "inline";
        let instaLink = document.querySelector("#instaLink");
        instaLink.href = data[i]["artist-social-instagram"];
      }

      if (data[i]["artist-social-twitter"]) {
        let artistTwitter = document.querySelector("#twitter-container");
        artistTwitter.style.display = "inline";
        let twitLink = document.querySelector("#twitLink");
        twitLink.href = data[i]["artist-social-twitter"];
      }

      if (data[i]["artist-social-linkedin"]) {
        let artistTwitter = document.querySelector("#linkedIn-container");
        artistTwitter.style.display = "inline";
        let twitLink = document.querySelector("#linkedInLink");
        twitLink.href = data[i]["artist-social-linkedin"];
      }
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
  const val = urlParams.get(key);
  return val;
}

// get json data from google sheet and format
function getHomePageData() {
  $.ajax({
    type: "GET",
    url:
      "https://script.google.com/macros/s/AKfycbwoIykn6ohjA1gLzdcpv_88WQFRt556oLMjcGjwwhQM9zP5eD6tluIqIiCye3j-sOET/exec",
    data: { get_param: "value" },
    dataType: "json",
    success: function(data) {
      let sortedData = data.sort(custom_sort);
      formatEvents(sortedData);
      // now the data has loaded:
      document.getElementById("loading-placeholder").style.display = "none";
    },
  });
}

// get json data from google sheet and format
function getEventData() {
  $.ajax({
    type: "GET",
    url:
      "https://script.google.com/macros/s/AKfycbwoIykn6ohjA1gLzdcpv_88WQFRt556oLMjcGjwwhQM9zP5eD6tluIqIiCye3j-sOET/exec",
    data: { get_param: "value" },
    dataType: "json",
    success: function(data) {
      let slug = getParamKey("artwork");
      formatEventPage(slug, data);
      const elementsToShow = document.querySelectorAll(".dontDisplayUntilLoad");
      elementsToShow.forEach((element) => {
        element.classList.remove("dontDisplayUntilLoad");
      });
      document.getElementById("loading").style.display = "none";
    },
  });
}

// get json data from google sheet and format
function getProgrammeData() {
  $.ajax({
    type: "GET",
    url:
      "https://script.google.com/macros/s/AKfycbwoIykn6ohjA1gLzdcpv_88WQFRt556oLMjcGjwwhQM9zP5eD6tluIqIiCye3j-sOET/exec",
    data: { get_param: "value" },
    dataType: "json",
    success: function(data) {
      console.log("data", data);
      let sortedData = data.sort(custom_sort);
      formatProgEvents(sortedData);
      // now the data has loaded:
      document.getElementById("loading-placeholder").style.display = "none";
      document.getElementById("pastEventsTitle").style.display = "block";
      let filterBar = document.getElementsByClassName("filterInputs");
      for (let item of filterBar) {
        item.style.display = "block";
      }
    },
  });
}

//getData();
