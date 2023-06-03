export default class UserInfo {
	constructor({nameSelector, jobSelector, avatarSelector}) {
	  this._name = document.querySelector(nameSelector)
	  this._job = document.querySelector(jobSelector)
	  this._avatar = document.querySelector(avatarSelector)
	}
  
	getUserInfo() {
		return {
			name: this._name.textContent,
			about: this._job.textContent
		}
	}
  
	setUserInfo(data) {
	  this._name.textContent = data.name;
	  this._job.textContent = data.about;
	}

	setUserAvatar(avatar) {
		this._avatar.src = avatar;
	}
  }