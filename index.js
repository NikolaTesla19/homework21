class NewPerson {
  constructor(info) {
    this.firstName = info.name.first;
    this.lastName = info.name.last;
    this.phone = info.cell;
    this.email = info.email;
    this.miniPhoto = info.picture.medium;
  }
  fullname() {
    return `${this.firstName} ${this.lastName}`
  }
}
const createPreview = (infoObj) => {
  let mainDiv = document.createElement('div');
  mainDiv.classList = 'mainDiv';
  mainDiv.innerHTML = `
    <div class="previewPhoto">
      <img src="${infoObj.miniPhoto}">
    </div>
    <div class="personInfo">
      <p class="p p1">
        ${infoObj.fullname()}
      </p>
      <p class="p p2">
        email: ${infoObj.email}
      </p>
      <p class="p p3">
        Phone: ${infoObj.phone}
      </p>
    </div>
  `
  return mainDiv
}
const scrollWindow = async () => {
  let list = document.getElementsByClassName('list');
  while(true) {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    try {
      let response = await fetch('https://randomuser.me/api', {
        method: 'GET'
      });
      let result = await response.json();
      let newPerson = new NewPerson (result.results[0]);
      list[0].appendChild(createPreview(newPerson));
    } catch (e) {
      alert(`Ops something is wrong, look what happened \n\n ${e}`);
    }
  }
}
window.onload = async () => {
  let list = document.getElementsByClassName('list');
  for (let i = 0; i < 13; i++) {
      try {
        let response = await fetch('https://randomuser.me/api', {
          method: 'GET'
        });
        let result = await response.json();
        let newPerson = new NewPerson (result.results[0]);
        list[0].appendChild(createPreview(newPerson));
      } catch (e) {
        alert(`Ops something is wrong, look what happened \n\n ${e}`);
      }
  }
  window.onscroll = scrollWindow;
  scrollWindow();
}
