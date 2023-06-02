export default class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
        this._authorization = options.headers.authorization;
}

	_getResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "GET",
			headers: this._headers,
		}).then((res) => this._getResponse(res));
	}


    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: {
            authorization: this._headers.authorization,
          },
        }).then((res) => this._getResponse(res));
    }
	
	sendUserData(dataUser) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
			  name: dataUser.name,
			  about: dataUser.about
			})
		}).then((res) => this._getResponse(res));
	}

	sendNewCard(card) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
			  name: card.name,
			  link: card.link,
			})
		}).then((res) => this._getResponse(res));
	}

    deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
                authorization: this._headers.authorization,
              },
			})
		.then((res) => this._getResponse(res));
	}

	sendNewAvatar(link) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
			  avatar: link,
			})
		}).then((res) => this._getResponse(res));
	}

	sendLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this._headers,
			})
		.then((res) => this._getResponse(res));
	}

	removeLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
                authorization: this._headers.authorization,
              },
			})
		.then((res) => this._getResponse(res));
	}
} 