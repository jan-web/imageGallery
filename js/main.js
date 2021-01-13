//Image Gallery of cars- maide by Yan Shatskiy
(function () {
  let btn = document.getElementById("play"),
    secondBlock = document.querySelector("#second-line"),
    typeSorting = document.querySelector("#type-sorting"),
    imagesleft = document.querySelector(".imagesleft"),
    rightArr = transform(data),
    last = 0,
    typeSortstorage = localStorage.getItem("typeSort"),
    e = {
      target: {
        value: typeSortstorage,
      },
    };
  console.log(rightArr);
  imagesleft.innerHTML = `There are ${rightArr.length - last} pictures left`;

  swithSorting(e);

  secondBlock.addEventListener("click", removeElement);
  // remove the picture that is selected
  function removeElement(event) {
    rightArr[event.target.accessKey].show = false;
    // redrawing all pictures from the current array
    actualRender();
  }

  function actualRender() {
    secondBlock.innerHTML = "";
    let i = 0;
    rightArr.map(function (element) {
      if (element.show) {
        render(rightArr[i]);
      }
      i++;
      return true;
    });
  }

  // Gallery built using template strings
  function render(item) {
    secondBlock.innerHTML =
      secondBlock.innerHTML +
      `<div class="col-md-3 col-sm-4 col-xs-6 text-center">\
              <div class="thumbnail">\
                <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
                  <div class="caption">\
                      <div class="text-muted">${item.name}</div>\
                      <div class="text-muted top-padding">${item.description}</div>\
                      <div class="text-muted">${item.date}</div>\
                  </div>\
                <button class="btn btn-danger" accessKey="${item.id}">Удалить</button>\
              </div>\
            </div>`;
  }
  // Form a new array with the collected data
  function transform(data) {
    let newMapArr = data.map(function (key) {
      let upName = key.name.toLowerCase();
      upName = upName[0].toUpperCase() + upName.slice(1);
      const newData = new Date(key.date);
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      return {
        url: key.url,
        name: upName,
        id: key.id - 1,
        show: false,
        description: key.description.substr(0, 15) + "...",
        date: monthNames[newData.getMonth()] + " " + newData.getDate() + ", " + newData.getFullYear(),
      };
    });

    return newMapArr;
  }

  function sortingAZ() {
    let tempArr = rightArr.sort(function (a, b) {
      let nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    afterSorting(tempArr);
  }
  // Set id in order of appearance in the array
  function afterSorting(arr) {
    let elementCount = 0;
    rightArr = arr.map(function (element) {
      console.log(element.id);

      element.id = elementCount;
      elementCount++;
      return element;
    });
    console.log(rightArr);
  }

  function sortingZA() {
    let tempArr = rightArr.sort(function (a, b) {
      let nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA > nameB) {
        return -1;
      } else if (nameA < nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    afterSorting(tempArr);
  }

  function sortingNewfirst() {
    let tempArr = rightArr.sort(function (a, b) {
      let dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateB - dateA; //sort by ascending date
    });
    afterSorting(tempArr);
  }

  function sortingOldfirst() {
    let tempArr = rightArr.sort(function (a, b) {
      let dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB; //sort by descending date
    });
    afterSorting(tempArr);
  }
  // listener of the dropdown
  typeSorting.addEventListener("change", function (e) {
    swithSorting(e);
  });

  function swithSorting(e) {
    console.log("e.target.value= " + e.target.value);
    let number = e.target.value;
    console.log("number = " + number);

    if (e.target.value == 1) {
      console.log("Case 1");
      sortingAZ();
      actualRender();
    } else if (e.target.value == 2) {
      console.log("Case 2");
      sortingZA();
      actualRender();
    } else if (e.target.value == 3) {
      console.log("Case 3");
      sortingNewfirst();
      actualRender();
    } else if (e.target.value == 4) {
      console.log("Case 4");
      sortingOldfirst();
      actualRender();
    }
    localStorage.setItem("typeSort", e.target.value);
  }

  btn.addEventListener("click", function () {
    if (last == rightArr.length) {
      $("#myModal").modal("show");
    } else {
      for (i = 0; i < rightArr.length; i++) {
        if (rightArr[i].show != true) {
          rightArr[i].show = true; // mark the last selected item as actual
          break;
        }
      }
      console.log(rightArr);
      actualRender();
      last++;
      imagesleft.innerHTML = `There are ${rightArr.length - last} pictures left`;
    }
  });
})();
